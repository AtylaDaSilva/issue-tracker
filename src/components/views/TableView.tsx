import { deleteCard, resolveCard } from "@/utils/mongodb";
import type { Card } from "@/utils/types";
import { formatDateTime, defaultClientDateTime, capitalizeString, currentDateTime } from "@/utils/functions";
import { Table } from "react-bootstrap"
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
                    <th>List</th>
                    <th>Labels</th>
                    <th>Created</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    cards.map((card: Card) => {
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
                                            modalTitle: "Resolve Card"
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
                                                    required: true,
                                                    hidden: true
                                                },
                                                {
                                                    type: "datetime-local",
                                                    name: "last_resolved",
                                                    value: currentDateTime(),
                                                    required: true,
                                                    hidden: true
                                                },
                                                {
                                                    type: "text",
                                                    name: "project_id",
                                                    value: card.project_id as string,
                                                    required: true,
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
                                <td>{JSON.parse(card.list).name}</td>
                                <td>{JSON.parse(card.labels).name}</td>
                                <td>{formatDateTime(card.created_at, defaultClientDateTime)}</td>
                                <td>{formatDateTime(card.due_date, defaultClientDateTime)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}