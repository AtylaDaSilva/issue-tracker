import { Project, Card } from '@/utils/types';
import { fetchProjects, fetchCards, getSession, fetchUserByEmail } from '@/utils/mongodb';
import { Container, Row, Col } from 'react-bootstrap';
import Toolbar from '@/components/toolbars/Toolbar';
import ViewContainer from '@/components/containers/ViewContainer';

export default async function Project({ params }: { params: { projectId: string } }) {
    const session = await getSession();
    const user = await fetchUserByEmail(session?.user?.email as string);
    const project: Project[] = await fetchProjects(user._id, params.projectId[0]);
    const cards: Card[] = await fetchCards({ user_id: user._id, project_id: params.projectId[0] });
    return (
        <Container fluid className='main-container d-flex flex-column'>
            <Row>
                <Col>
                    {<Toolbar project={project[0]} />}
                </Col>
            </Row>
            <Row className='flex-grow-1'>
                <Col>
                    {<ViewContainer cards={cards} />}
                </Col>
            </Row>
        </Container>
    )
}