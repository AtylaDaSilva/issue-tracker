import type { Project } from "@/utils/types"
import { Container } from "react-bootstrap"

export default function Toolbar({ project }: { project: Project }) {
    return (
        <Container fluid className="">
            <h1>{ project.name }</h1>
        </Container>
    )
}