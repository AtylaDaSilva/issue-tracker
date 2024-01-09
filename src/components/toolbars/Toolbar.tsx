import { deleteProject, addCard } from "@/utils/mongodb"
import type { Project } from "@/utils/types"
import { currentDateTime } from "@/utils/functions"
import { Container } from "react-bootstrap"
import FormModal from "../modals/FormModal"
import ConfirmModal from "../modals/ConfirmModal"
import styles from "@/css/modules/styles.module.css";

export default function Toolbar({ project }: { project: Project }) {
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
                    modalOptions={{
                        headerText: "New Card"
                    }}
                    fields={[
                        [
                            {
                                type: "text",
                                name: "name",
                                placeholder: "Card Name",
                                required: true,
                                col: 12
                            }
                        ],
                        [
                            {
                                type: "number",
                                name: "priority",
                                min: 1,
                                max: 5,
                                placeholder: "Priority",
                                required: true
                            },
                            {
                                type: "datetime-local",
                                name: "due_date",
                                placeholder: "Due Date",
                                required: true
                            },
                            {
                                type: "select",
                                name: "status",
                                placeholder: "Status",
                                required: true,
                                options: [
                                    { label: "--Status--", value: "" },
                                    { label: "Open", value: "open", selected: true },
                                    { label: "Wont Do", value: "wont_do" },
                                    { label: "Resolved", value: "resolved" },
                                ]
                            }
                        ],
                        [
                            {
                                type: "text",
                                name: "list",
                                placeholder: "List",
                                required: true
                            },
                            {
                                type: "text",
                                name: "labels",
                                placeholder: "Labels",
                                required: true
                            },
                            {
                                type: "text",
                                name: "members",
                                placeholder: "Members",
                                required: true
                            }
                        ],
                        [
                            {
                                type: "text",
                                name: "project_id",
                                value: project._id as string,
                                required: true,
                                hidden: true
                            },
                            {
                                type: "text",
                                name: "user_id",
                                value: project.user_id as string,
                                required: true,
                                hidden: true
                            },
                            {
                                type: "datetime-local",
                                name: "created_at",
                                value: currentDateTime(),
                                required: true,
                                hidden: true
                            }
                        ]
                    ]}
                    handleSubmit={addCard}
                />
                <ConfirmModal
                    trigger={<i className="bi bi-folder-x mb-1 mx-1"></i>}
                    triggerOptions={{
                        styles: styles.deleteProject,
                        tooltip: { title: "Delete Project", placement: "bottom" }
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