import { addProject, fetchProjects } from '@/utils/mongodb';
import type { Project } from '@/utils/types';
import Brand from '../icons/Brand';
import ProjectIcon from '../icons/ProjectIcon';
import Avatar from '../icons/Avatar';
import FormModal from '../modals/FormModal';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

export default async function Sidebar() {
    const data = await fetchProjects();
    const projects = data.map((project: Project) => {
        return (
            <ProjectIcon
                key={project._id?.toString()}
                projectId={project._id.toString()}
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
            <Brand />
            <hr className='text-success w-75' />
            <div className='d-flex flex-column align-items-center'>
                <FormModal
                    trigger={<Button variant='success' className='mb-2'>+</Button>}
                    handleSubmit={addProject}
                    fields={formFields}
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