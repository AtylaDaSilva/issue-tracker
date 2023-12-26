import { addProject, fetchProjects } from '@/utils/mongodb';
import type { Project } from '@/utils/types';
import Brand from '../icons/Brand';
import ProjectIcon from '../icons/ProjectIcon';
import Avatar from '../icons/Avatar';
import FormModal from '../modals/FormModal';
import { Form, FloatingLabel } from 'react-bootstrap';
import styles from "@/css/modules/styles.module.css";

export default async function Sidebar() {
    const data: Project[] = await fetchProjects();
    const projects = data.map((project: Project) => {
        return (
            <ProjectIcon
                key={project._id as string}
                projectId={project._id as string}
                projectName={project.name}
            />
        );
    });
    const formFields: JSX.Element[] = [
        <FloatingLabel className='my-2' controlId='add-project-lable' label='Project Name'>
            <Form.Control name='projectName' type='text' placeholder='Project Name' />
        </FloatingLabel>
    ];
    return (
        <nav
            style={{ width: "70px" }}
            className="d-flex flex-column align-items-center p-2"
        >
            <Brand
                href="/"
                styles={styles.brand}
                logo={<i id='brand' className="bi bi-bug-fill" />}
            />
            <hr className='w-75' />
            <div className='d-flex flex-column align-items-center'>
                <FormModal
                    trigger={<i className="bi bi-file-earmark-plus-fill"></i>}
                    handleSubmit={addProject}
                    fields={formFields}
                    triggerOptions={{styles: styles.addProject, tooltip: {title: "Add Project", placement: "right"}}}
                    modalOptions={{
                        size: "sm",
                        headerText: "New Project",
                        footerButttonText: "Add Project"
                    }}
                />
                {projects}
            </div>
            <div className='mt-auto'>
                <Avatar />
            </div>
        </nav>
    )
}