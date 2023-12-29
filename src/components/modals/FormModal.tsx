'use client'
import { Modal, Button, Form } from "react-bootstrap"
import { useState } from "react"
import BSTooltipOverlay from "../tooltips/BSTooltip"
import type { FormModal } from "@/utils/types"
import { nanoid } from "nanoid"

export default function FormModal({ trigger, fields, triggerOptions, modalOptions, handleSubmit }: FormModal) {
    const [showModal, setShowModal] = useState(false);
    trigger.props.className = `${trigger.props.className} ${triggerOptions?.styles}`;
    trigger.props.onClick = () => setShowModal(true);
    return (
        <>
            {
                triggerOptions?.tooltip !== undefined
                    ? <BSTooltipOverlay id={nanoid()} placement={triggerOptions?.tooltip?.placement} title={triggerOptions.tooltip.title}>{trigger}</BSTooltipOverlay>
                    : trigger
            }
            <Modal
                show={showModal}
                size={modalOptions?.size || "lg"}
                aria-labelledby="contained-modal-title-vcenter"
                centered={
                    modalOptions?.centered !== undefined
                        ? modalOptions?.centered
                        : true
                }
            >
                <Modal.Header closeButton onHide={() => setShowModal(false)}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>{modalOptions?.headerText || "Form Modal"}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Form action={async (formData) => {
                    await handleSubmit(formData);
                    setShowModal(false);
                }}>
                    <Modal.Body>
                        {fields.map((input) => input)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShowModal(false)}>Close</Button>
                        <Button type="submit">{
                            modalOptions?.footerButttonText || "Save"
                        }</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}