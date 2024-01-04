import { deleteProject, addCard } from "@/utils/mongodb"
import type { Project } from "@/utils/types"
import { Container, Form, FloatingLabel } from "react-bootstrap"
import FormModal from "../modals/FormModal"
import ConfirmModal from "../modals/ConfirmModal"
import styles from "@/css/modules/styles.module.css";

export default function Toolbar({ project }: { project: Project }) {
    const formFields: JSX.Element[] = [
        <Form.Control name="project_id" type="text" required hidden value={project._id as string} />,
        <Form.Control name="user_id" type="text" required hidden value={project.user_id as string} />,
        <Form.Control name="status" type="text" required hidden value="open" />,
        <Form.Control name="first_opened_at" type="text" required hidden value={ new Date().toString()} />,
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
            <Form.Control name="priority" type="number" min={1} max={5} required placeholder="Priority" />
        </FloatingLabel>,
        <FloatingLabel
            label="Severity"
            controlId="severityInput"
        >
            <Form.Control name="severity" type="number" min={1} max={5} required placeholder="Severity" />
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
            <div className={styles.projectNameContainer}>
                <h1 className="fs-2">{project.name}</h1>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-start">
                <FormModal
                    trigger={<i className="bi bi-file-earmark-plus-fill mb-1 mx-1"></i>}
                    triggerOptions={{
                        styles: styles.addCard,
                        tooltip: { title: "Add Card", placement: "bottom" }
                    }}
                    fields={formFields}
                    handleSubmit={addCard}
                />
                <ConfirmModal
                    trigger={<i className="bi bi-folder-x mb-1 mx-1"></i>}
                    triggerOptions={{
                        styles: styles.deleteProject,
                        tooltip: {title: "Delete Project", placement: "bottom"}
                    }}
                    message="Are you sure you want to delete this project and all of its cards? This process can not be undone."
                    params={project._id}
                    modalOptions={{ centered: false, modalTitle: "Delete Project" }}
                    handleSubmit={deleteProject}
                />
            </div>
        </Container>
    )
}