import { deleteProject, addCard, createList, fetchLists, deleteList } from "@/utils/mongodb";
import type { Project, List, SelectOptions } from "@/utils/types";
import { currentDateTime } from "@/utils/functions";
import { Container } from "react-bootstrap";
import FormModal from "../modals/FormModal";
import ConfirmModal from "../modals/ConfirmModal";
import TableModal from "../modals/TableModal";
import styles from "@/css/modules/styles.module.css";

export default async function Toolbar({ project }: { project: Project }) {
    const lists: List[] = await fetchLists({ user_id: project.user_id });
    const listSelectOptions: SelectOptions[] = lists.map((list: List) => {
        const option: SelectOptions = {
            label: list.name as string,
            value: list._id as string
        }
        return option;
    })

    return (
        <Container fluid className="d-flex align-items-center justify-content-start">
            <div className={styles.projectNameContainer}>
                <h1 className="fs-2">{project.name}</h1>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-start">
                <FormModal
                    trigger={<i className="bi bi-file-earmark-plus mb-1 mx-1"></i>}
                    triggerOptions={{
                        styles: styles.addCard,
                        tooltip: { title: "Add Card", placement: "bottom" }
                    }}
                    modalOptions={{
                        modalTitle: "New Card"
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
                                type: "select",
                                name: "list",
                                placeholder: "List",
                                options: [
                                    {
                                        label: "Select a List",
                                        value: "",
                                        selected: true
                                    },
                                    ...listSelectOptions
                                ],
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
                <TableModal
                    trigger={<i className="bi bi-card-list"></i>}
                    triggerOptions={{
                        styles: styles.listButton,
                        tooltip: { title: "Lists", placement: "bottom", }
                    }}
                    modalOptions={{
                        size: "lg",
                        centered: true,
                        modalTitle: "Lists",
                        headerButtons: [
                            {
                                trigger: (
                                    <FormModal
                                        trigger={<i className={`bi bi-plus-lg`}></i>}
                                        triggerOptions={{
                                            styles: styles.addListModalButton,
                                            tooltip: { title: "New List", placement: "bottom" }
                                        }}
                                        modalOptions={{
                                            size: "sm",
                                            centered: true,
                                            modalTitle: "New List",
                                            refreshRouterOnSubmit: true
                                        }}
                                        fields={[
                                            [
                                                {
                                                    type: "text",
                                                    name: "name",
                                                    required: true,
                                                    col: 12
                                                },
                                                {
                                                    type: "text",
                                                    name: "user_id",
                                                    value: project.user_id as string,
                                                    hidden: true,
                                                    required: true
                                                }
                                            ]
                                        ]}
                                        handleSubmit={createList}
                                    />
                                )
                            }
                        ]
                    }}
                    tableData={{
                        header: [
                            [
                                "#", "List Name",
                                <i className="bi bi-trash3 fs-6"></i>
                            ]
                        ],
                        body: lists.map((list: List, listIndex) => {
                            return [
                                listIndex + 1,
                                list.name,
                                <ConfirmModal
                                    trigger={<i className="bi bi-trash3 fs-6 text-danger clickable"></i>}
                                    triggerOptions={{
                                        tooltip: { title: `Delete ${list.name}`, placement: "right" }
                                    }}
                                    message="Are you sure you want to delete this List? This process can not be undone."
                                    params={{ "_id": list._id }}
                                    handleSubmit={deleteList}
                                    modalOptions={{
                                        centered: true,
                                        modalTitle: "Delete List",
                                        refreshRouterOnSubmit: true
                                    }}
                                />
                            ]
                        })
                    }}
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