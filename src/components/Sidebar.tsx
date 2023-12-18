import Brand from './Brand';
import ProjectIcon from './ProjectIcon';
import { Button } from 'react-bootstrap';
import Avatar from './Avatar';
import { fetchProjects } from '@/utils/mongodb';
import type { Project } from '@/utils/types';

export default async function Sidebar() {
    const data = await fetchProjects();
    const projects = data.map((project: Project) => {
        return (
            <ProjectIcon
                key={project.project_id}
                projectId={project.project_id}
                projectName={project.name}
            />
        );
    });
    return (
        <nav
            style={{ width: "70px" }}
            className="d-flex flex-column align-items-center p-2">
            <Brand />
            <hr className='text-success w-75' />
            <div className='d-flex flex-column align-items-center'>
                <Button variant='success' className='mb-2'>+</Button>
                {projects}
            </div>
            <div className='mt-auto'>
                <Avatar />
            </div>
        </nav>
    )
}