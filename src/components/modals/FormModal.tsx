'use client'
import { Modal, Button, Form, FloatingLabel, InputGroup, Container, Row, Col } from "react-bootstrap"
import { useState } from "react"
import BSTooltip from "../tooltips/BSTooltip"
import type { FormModal, ModalField } from "@/utils/types"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"

export default function FormModal({ trigger, fields, triggerOptions, modalOptions, handleSubmit }: FormModal) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    trigger.props.className = `${trigger.props.className} ${triggerOptions?.styles}`;
    trigger.props.onClick = () => setShowModal(true);
    return (
        <>
            {
                triggerOptions?.tooltip !== undefined
                    ? <BSTooltip id={nanoid()} placement={triggerOptions?.tooltip?.placement} title={triggerOptions.tooltip.title}>{trigger}</BSTooltip>
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
                        <h4>{modalOptions?.modalTitle || "Form Modal"}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Form action={async (formData) => {
                    await handleSubmit(formData);
                    setShowModal(false);
                    if (modalOptions?.refreshRouterOnSubmit) {
                        router.refresh();
                    }
                }}>
                    <Modal.Body>
                        <Container fluid>
                            {
                                fields.map((row: any) => {
                                    return (
                                        <Row key={nanoid()} className="my-3">
                                            {
                                                row.map((field: ModalField) => {
                                                    try {
                                                        switch (field.type.toLocaleLowerCase()) {
                                                            case "email":
                                                            case "password":
                                                            case "number":
                                                            case "date":
                                                            case "time":
                                                            case "datetime-local":
                                                            case "textarea":
                                                            case "text":
                                                                return (
                                                                    <Col key={nanoid()} xs={field.col}>
                                                                        <FloatingLabel
                                                                            key={nanoid()}
                                                                            controlId={nanoid()}
                                                                            label={field.placeholder}
                                                                            className=""
                                                                        >
                                                                            <Form.Control
                                                                                key={nanoid()}
                                                                                id={field.id}
                                                                                type={field.type}
                                                                                as={(field.type.toLocaleLowerCase() === "textarea") ? "textarea" : undefined}
                                                                                name={field.name}
                                                                                value={field.value}
                                                                                hidden={(field.hidden !== undefined) ? field.hidden : false}
                                                                                placeholder={field.placeholder}
                                                                                readOnly={field.readonly}
                                                                                disabled={field.disabled}
                                                                                required={field.required}
                                                                            />
                                                                        </FloatingLabel>
                                                                    </Col>
                                                                )
                                                            case "select":
                                                                return (
                                                                    <Col key={nanoid()}>
                                                                        <FloatingLabel
                                                                            key={nanoid()}
                                                                            controlId={nanoid()}
                                                                            label={field.placeholder}
                                                                        >
                                                                            <Form.Select
                                                                                key={nanoid()}
                                                                                id={field.id}
                                                                                name={field.name}
                                                                                value={field.value}
                                                                                aria-label={`SelectForm${nanoid()}`}
                                                                                size={field.selectSize}
                                                                                disabled={field.disabled}
                                                                                required={field.required}
                                                                            >
                                                                                {
                                                                                    field.options?.map(option => {
                                                                                        return (
                                                                                            <option
                                                                                                key={nanoid()}
                                                                                                value={option.value}
                                                                                                selected={option.selected}
                                                                                            >
                                                                                                {option.label}
                                                                                            </option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Form.Select>
                                                                        </FloatingLabel>
                                                                    </Col>
                                                                );
                                                            case "radio":
                                                            case "switch":
                                                            case "checkbox":
                                                                return (
                                                                    <Col key={nanoid()}>
                                                                        <Form.Check
                                                                            key={nanoid()}
                                                                            id={nanoid()}
                                                                            name={field.name}
                                                                            checked={field.checked}
                                                                            label={field.label}
                                                                            inline={field.inline}
                                                                            reverse={field.reverse}
                                                                            value={field.value}
                                                                            type={
                                                                                (field.type.toLocaleLowerCase() === "checkbox")
                                                                                    ? "checkbox"
                                                                                    : (field.type.toLocaleLowerCase() === "radio")
                                                                                        ? "radio"
                                                                                        : "switch"
                                                                            }
                                                                            disabled={field.disabled}
                                                                            required={field.required}
                                                                        />
                                                                    </Col>
                                                                );
                                                            case "range":
                                                                return (
                                                                    <Col key={nanoid()}>
                                                                        <Form.Label key={nanoid()}>
                                                                            {field.label}
                                                                        </Form.Label>
                                                                        <Form.Range
                                                                            key={nanoid()}
                                                                            id={field.id}
                                                                            name={field.name}
                                                                            value={field.value}
                                                                            disabled={field.disabled}
                                                                            min={field.min}
                                                                            max={field.max}
                                                                            required={field.required}
                                                                        />
                                                                    </Col>
                                                                );
                                                            case "inputgroup":
                                                                const formControlId = nanoid();
                                                                return (
                                                                    <Col key={nanoid()}>
                                                                        <InputGroup
                                                                            key={nanoid()}
                                                                            size={field.inputGroupSize}
                                                                        >
                                                                            <Form.Label
                                                                                key={nanoid()}
                                                                                htmlFor={formControlId}
                                                                            >
                                                                                {field.label}
                                                                            </Form.Label>
                                                                            {
                                                                                field.placement === "left" &&
                                                                                <InputGroup.Text
                                                                                    key={nanoid()}
                                                                                    id={nanoid()}
                                                                                >
                                                                                    {field.group}
                                                                                </InputGroup.Text>
                                                                            }
                                                                            <Form.Control
                                                                                key={nanoid()}
                                                                                id={formControlId}
                                                                                name={field.name}
                                                                                value={field.value}
                                                                                placeholder={field.placeholder}
                                                                                aria-label={field.label}
                                                                                disabled={field.disabled}
                                                                                required={field.required}
                                                                            />
                                                                            {
                                                                                field.placement === "right" &&
                                                                                <InputGroup.Text
                                                                                    key={nanoid()}
                                                                                    id={nanoid()}
                                                                                >
                                                                                    {field.group}
                                                                                </InputGroup.Text>
                                                                            }
                                                                        </InputGroup>
                                                                    </Col>
                                                                );
                                                            default:
                                                                throw new Error(`Field of type '${field.type}' is not suppported in ConfirmModal.`);
                                                        }
                                                    } catch (err) {
                                                        console.error("Error while rendering modal fields => ", err);
                                                    }
                                                })
                                            }
                                        </Row>
                                    )
                                })
                            }
                        </Container>
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