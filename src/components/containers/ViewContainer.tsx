import type { Card } from "@/utils/types"
import { Container } from "react-bootstrap"
import TableView from "../views/TableView"

export default function ViewContainer({ cards }: { cards: Card[] }) {
    return (
        <Container fluid className="p-0">
            <TableView cards={cards} />
        </Container>
    )
}