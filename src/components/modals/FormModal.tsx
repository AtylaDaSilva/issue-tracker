'use client'
import { Modal, Button, Form } from "react-bootstrap"
import { useState } from "react"
import type { FormModal } from "@/utils/types"

export default function FormModal({ trigger, fields, modalOptions, handleSubmit }: FormModal) {
    const [showModal, setShowModal] = useState(false)
    trigger.props.onClick = () => setShowModal(true);
    return (
        <>
            {trigger}
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
                <Form action={handleSubmit}>
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