import { fetchProjects } from '@/utils/mongodb';
import { Container, Button } from 'react-bootstrap';
import type { Project } from '@/utils/types';

export default async function Home() {
  const data: Project[] = await fetchProjects();
  return (
    <Container fluid className='main-container d-flex align-items-center justify-content-center'>
      {
        (data.length > 0)
          ? <h2>Select a project.</h2>
          : <div className='d-flex flex-column align-items-center'><h2>Looks like you don't have any projects.</h2></div>
      }
    </Container>
  )
}
