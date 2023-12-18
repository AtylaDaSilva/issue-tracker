import type { Cards } from "@/utils/types";
import { capitalizeString } from "@/utils/functions";
import { Table } from "react-bootstrap"

export default function TableView({ cards }: { cards: Cards }) {
    const cardHeaders = Object.keys(cards[0]);
    const tableHead = cardHeaders.map((header, index) => {
        if (header !== "_id") return <th key={index}>{capitalizeString(header)}</th>;
    });
    const tableData = cards.map(card => {
        return (
            <tr key={card._id.toString()}>
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
    return (
        <Table hover>
            <thead>{tableHead}</thead>
            <tbody>{tableData}</tbody>
        </Table>
    )
}