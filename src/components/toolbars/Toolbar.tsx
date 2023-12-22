import { deleteProject, addCard } from "@/utils/mongodb"
import type { Project } from "@/utils/types"
import { Container, Button, Form, FloatingLabel } from "react-bootstrap"
import FormModal from "../modals/FormModal"
import ConfirmModal from "../modals/ConfirmModal"

export default function Toolbar({ project }: { project: Project }) {
    const formFields: JSX.Element[] = [
        <Form.Control name="project_id" type="text" required placeholder="projectId" hidden value={project._id as string} />,
        <FloatingLabel
            label="Card Name"
            controlId="cardNameInput"
        >
            <Form.Control name="name" type="text" required placeholder="Card Name" />
        </FloatingLabel>,
        <FloatingLabel
            label="Priority"
            controlId="priorityInput"
        >
            <Form.Control name="priority" type="number" required placeholder="Priority" />
        </FloatingLabel>,
        <FloatingLabel
            label="Severity"
            controlId="severityInput"
        >
            <Form.Control name="severity" type="number" required placeholder="Severity" />
        </FloatingLabel>,
        <FloatingLabel
            label="List"
            controlId="listInput"
        >
            <Form.Control name="list" type="text" required placeholder="List" />
        </FloatingLabel>,
        <FloatingLabel
            label="Labels"
            controlId="labelsInput"
        >
            <Form.Control name="labels" type="text" required placeholder="Labels" />
        </FloatingLabel>,
        <FloatingLabel
            label="Members"
            controlId="membersInput"
        >
            <Form.Control name="members" type="text" required placeholder="Members" />
        </FloatingLabel>,
        <FloatingLabel
            label="Due Date"
            controlId="dueDateInput"
        >
            <Form.Control name="due_date" type="date" required placeholder="Due Date" />
        </FloatingLabel>
    ];
    return (
        <Container fluid className="d-flex align-items-center justify-content-start">
            <h1>{project.name}</h1>
            <FormModal
                trigger={<Button variant="success">Add Card</Button>}
                fields={formFields}
                handleSubmit={addCard}
            />
            <ConfirmModal
                trigger={<Button>Delete Project</Button>}
                message="Are you sure you want to delete this project?"
                params={project._id}
                modalOptions={{ centered: false, modalTitle: "Delete Project" }}
                handleSubmit={deleteProject}
            />
        </Container>
    )
}