import { deleteCard } from "@/utils/mongodb";
import type { Card } from "@/utils/types";
import { formatDate } from "@/utils/functions";
import { Table } from "react-bootstrap"
import ConfirmModal from "../modals/ConfirmModal";

export default function TableView({ cards }: { cards: Card[] }) {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th><i className="bi bi-trash3 fs-5"></i></th>
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
                                    <ConfirmModal
                                        trigger={<i className="bi bi-trash3 fs-5 text-danger clickable"></i>}
                                        triggerOptions={{
                                            tooltip: {title: `Delete '${card.name}'`, placement: "left"}
                                        }}
                                        message="Are you sure you want to delete this card? This process can not be undone."
                                        params={card._id}
                                        handleSubmit={deleteCard}
                                        modalOptions={{ centered: true, modalTitle: "Delete Card" }}
                                    />
                                </td>
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