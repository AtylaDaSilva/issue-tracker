'use client'
import { deleteProject } from "@/utils/mongodb"
import type { Project } from "@/utils/types"
import { Container, Button } from "react-bootstrap"

export default function Toolbar({ project }: { project: Project }) {
    return (
        <Container fluid className="d-flex align-items-center justify-content-start">
            <h1>{project.name}</h1>
            <Button
                onClick={async () => await deleteProject(project._id)}
            >
                Delete
            </Button>
        </Container>
    )
}