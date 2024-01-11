import { addProject, fetchProjects, getSession, fetchUserByEmail } from '@/utils/mongodb';
import type { Project } from '@/utils/types';
import Brand from '../icons/Brand';
import ProjectIcon from '../icons/ProjectIcon';
import Avatar from '../icons/Avatar';
import FormModal from '../modals/FormModal';
import styles from "@/css/modules/styles.module.css";

export default async function Sidebar() {
    const session = await getSession();
    const user = await fetchUserByEmail(session?.user?.email as string);
    const data: Project[] = await fetchProjects(user._id);
    const projects = data.map((project: Project) => {
        return (
            <ProjectIcon
                key={project._id as string}
                projectId={project._id as string}
                icon={<i className="bi bi-folder-fill"></i>}
                styles={styles.projectIcon}
                tooltipOptions={{ placement: "right", title: project.name }}
            />
        );
    });
    return (
        <nav
            style={{ width: "70px" }}
            className="d-flex flex-column align-items-center py-2"
        >
            <Brand
                href="/"
                styles={styles.brand}
                logo={<i id='brand' className="bi bi-bug-fill" />}
            />
            <hr className='w-75' />
            <div className='d-flex flex-column align-items-center'>
                <FormModal
                    trigger={<i className="bi bi-folder-plus mb-1"></i>}
                    handleSubmit={addProject}
                    fields={[
                        [
                            { type: "text", name: "user_id", value: user._id, hidden: true },
                            { type: "text", name: "name", placeholder: "Project Name",  col: 12 }
                        ]
                    ]}
                    triggerOptions={{ styles: styles.addProject, tooltip: { title: "Create Project", placement: "right" } }}
                    modalOptions={{
                        size: "sm",
                        modalTitle: "New Project",
                        footerButttonText: "Create Project"
                    }}
                />
                {projects}
            </div>
            <div className='mt-auto'>
                <Avatar user={session?.user} styles={styles.Avatar} />
            </div>
        </nav>
    )
}