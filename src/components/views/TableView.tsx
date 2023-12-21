import type { Cards } from "@/utils/types";
import { Table } from "react-bootstrap"

export default function TableView({ cards }: { cards: Cards }) {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Name</th>
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
                                <td>{card.priority}</td>
                                <td>{card.severity}</td>
                                <td>{card.list}</td>
                                <td>{card.labels.join(',')}</td>
                                <td>{card.members.join(',')}</td>
                                <td>{card.due_date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}