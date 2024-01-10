"use client";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Modal, Table } from "react-bootstrap";
import BSTooltip from "../tooltips/BSTooltip";
import type { TableModal, ModalHeaderButton } from "@/utils/types";

export default function TableModal({ trigger, triggerOptions, modalOptions, tableData }: TableModal) {
    const modalId = `table-modal-${nanoid()}`;
    const [showModal, setShowModal] = useState(false);
    trigger.props.className = `${trigger.props.className} ${triggerOptions.styles}`;
    trigger.props.onClick = () => setShowModal(true);
    return (
        <>
            {
                triggerOptions?.tooltip !== undefined
                    ? <BSTooltip
                        id={nanoid()}
                        title={triggerOptions?.tooltip?.title}
                        placement={triggerOptions?.tooltip?.placement}
                    >
                        {trigger}
                    </BSTooltip>
                    : trigger
            }
            <Modal
                show={showModal}
                size={modalOptions?.size || "xl"}
                aria-labelledby={modalId}
                centered={modalOptions?.centered || true}
            >
                <Modal.Header closeButton onHide={() => setShowModal(false)}>
                    <Modal.Title id={modalId} className="w-100 d-flex flex-row align-items-center">
                        <h4 className="flex-grow-1">{modalOptions?.modalTitle}</h4>
                        {
                            modalOptions?.headerButtons?.map((button: ModalHeaderButton) => {
                                button.trigger.key = nanoid();
                                return button.trigger;
                            })
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover bordered>
                        <thead>
                            {tableData.header.map(row => {
                                return (
                                    <tr key={nanoid()}>
                                        { row.map(data => <th key={nanoid()}>{data}</th>) }
                                    </tr>
                                )
                            })}
                        </thead>
                        <tbody>
                            {tableData.body.map(row => {
                                return (
                                    <tr key={nanoid()}>
                                        {row.map(data => <td key={nanoid()}>{data}</td>) }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
}