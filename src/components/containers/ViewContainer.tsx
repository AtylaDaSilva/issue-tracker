import type { Project } from "@/utils/types"
import { Container } from "react-bootstrap"
import TableView from "../views/TableView"

export default function ViewContainer({ project }: { project: Project }) {
    return (
        <Container fluid className="p-0">
            <TableView cards={ project.cards } />
        </Container>
    )
}