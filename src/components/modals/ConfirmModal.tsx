'use client'
import type { ConfirmModal } from "@/utils/types";
import { Modal, Button, Form } from "react-bootstrap"
import { useState } from "react"

export default function ConfirmModal({ trigger, message, params, modalOptions, handleSubmit }: ConfirmModal) {
    const [showModal, setShowModal] = useState(false);
    trigger.props.onClick = () => setShowModal(true);
    return (
        <>
            {trigger}
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