import { deleteCard, resolveCard } from "@/utils/mongodb";
import type { Card } from "@/utils/types";
import { formatDate, capitalizeString } from "@/utils/functions";
import { Table, Form } from "react-bootstrap"
import ConfirmModal from "../modals/ConfirmModal";
import FormModal from "../modals/FormModal";

export default function TableView({ cards }: { cards: Card[] }) {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th><i className="bi bi-file-check fs-5"></i></th>
                    <th><i className="bi bi-trash3 fs-5"></i></th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Severity</th>
                    <th>List</th>
                    <th>Labels</th>
                    <th>Members</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    cards.map(card => {
                        return (
                            <tr key={card._id as string}>
                                <td>{card.name}</td>
                                <td>
                                    <FormModal
                                        trigger={<i className={`fs-5 clickable bi bi-file-check${["resolved", "wont_do"].indexOf(card.status.toLowerCase()) !== -1 ? "-fill text-success" : ""}`}></i>}
                                        triggerOptions={{
                                            tooltip: { title: `${card.status.toLowerCase() == "resolved" ? "Open" : "Resolve"} card`, placement: "left" }
                                        }}
                                        modalOptions={{
                                            headerText: "Resolve Card"
                                        }}
                                        fields={[
                                            [
                                                {
                                                    type: "select",
                                                    name: "status",
                                                    options: [
                                                        { label: "--Status--", value: "" },
                                                        { label: "Open", value: "open" },
                                                        { label: "Wont Do", value: "wont_do" },
                                                        { label: "Resolved", value: "resolved", selected: true },
                                                    ]
                                                }
                                            ],
                                            [
                                                {
                                                    type: "text",
                                                    name: "_id",
                                                    value: card._id as string,
                                                    hidden: true
                                                },
                                                {
                                                    type: "text",
                                                    name: "last_resolved",
                                                    value: new Date().toString(),
                                                    hidden: true
                                                },
                                                {
                                                    type: "text",
                                                    name: "project_id",
                                                    value: card.project_id as string,
                                                    hidden: true
                                                }
                                            ]
                                        ]}
                                        handleSubmit={resolveCard}
                                    />
                                </td>
                                <td>
                                    <ConfirmModal
                                        trigger={<i className="bi bi-trash3 fs-5 text-danger clickable"></i>}
                                        triggerOptions={{
                                            tooltip: { title: `Delete '${card.name}'`, placement: "left" }
                                        }}
                                        message="Are you sure you want to delete this card? This process can not be undone."
                                        params={card._id}
                                        handleSubmit={deleteCard}
                                        modalOptions={{ centered: true, modalTitle: "Delete Card" }}
                                    />
                                </td>
                                <td>{capitalizeString(card.status)}</td>
                                <td>{card.priority}</td>
                                <td>{card.severity}</td>
                                <td>{card.list}</td>
                                <td>{card.labels}</td>
                                <td>{card.members}</td>
                                <td>{formatDate(card.due_date)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}