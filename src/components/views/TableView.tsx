import { deleteCard } from "@/utils/mongodb";
import type { Card } from "@/utils/types";
import { Table, Button } from "react-bootstrap"
import ConfirmModal from "../modals/ConfirmModal";

export default function TableView({ cards }: { cards: Card[] }) {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Delete</th>
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
                                        trigger={<Button variant="danger">Delete</Button>}
                                        message="Are you sure you want to delete this card?"
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
                                <td>{card.due_date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}