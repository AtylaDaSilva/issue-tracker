import { fetchProjects } from '@/utils/mongodb';
import type { ProjectParams } from "@/utils/types"
import { Container, Row, Col } from 'react-bootstrap';
import Toolbar from '@/components/Toolbar';
import ViewContainer from '@/components/ViewContainer';

export default async function Project({ params }: { params: ProjectParams }) {
    const project = await fetchProjects(params.projectId[0]);
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