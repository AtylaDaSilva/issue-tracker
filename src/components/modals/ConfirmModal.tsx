'use client'
import type { ConfirmModal } from "@/utils/types";
import BSTooltip from "../tooltips/BSTooltip";
import { Modal, Button } from "react-bootstrap"
import { useState } from "react"
import { nanoid } from "nanoid";

export default function ConfirmModal({ trigger, message, params, triggerOptions, modalOptions, handleSubmit }: ConfirmModal) {
    const [showModal, setShowModal] = useState(false);
    trigger.props.onClick = () => setShowModal(true);
    trigger.props.className = `${trigger.props.className} ${triggerOptions?.styles}`
    return (
        <>
            {
                triggerOptions?.tooltip !== undefined
                    ? <BSTooltip id={nanoid()} title={triggerOptions.tooltip.title} placement={triggerOptions.tooltip.placement}>{trigger}</BSTooltip>
                    : trigger
            }
            <Modal
                show={showModal}
                size={modalOptions?.size || "sm"}
                centered={
                    modalOptions?.centered !== undefined
                        ? modalOptions?.centered
                        : true
                }
            >
                <Modal.Header closeButton onHide={() => setShowModal(false)}>
                    <Modal.Title><h4>{modalOptions?.modalTitle || "Confirm Modal"}</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={async () => {
                        await handleSubmit(params);
                        setShowModal(false);
                    }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}