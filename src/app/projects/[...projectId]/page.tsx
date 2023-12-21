import { Project } from '@/utils/types';
import { fetchProjects } from '@/utils/mongodb';
import { Container, Row, Col } from 'react-bootstrap';
import Toolbar from '@/components/toolbars/Toolbar';
import ViewContainer from '@/components/containers/ViewContainer';

export default async function Project({ params }: { params: {projectId: string} }) {
    const project: Project = await fetchProjects(params.projectId[0]);
    return (
        <Container fluid className='h-100 d-flex flex-column'>
            <Row>
                <Col>
                    <Toolbar project={ project } />
                </Col>
            </Row>
            <Row className='flex-grow-1'>
                <Col>
                    {<ViewContainer project={ project } />}
                </Col>
            </Row>
        </Container>
    )
}