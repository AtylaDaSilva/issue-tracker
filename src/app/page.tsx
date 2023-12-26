import { fetchProjects } from '@/utils/mongodb';
import { Button } from 'react-bootstrap';
import type { Project } from '@/utils/types';

export default async function Home() {
  const data: Project[] = await fetchProjects();
  return (
    <main
      className='rounded-3 m-auto d-flex justify-content-center align-items-center flex-grow-1'
    >
      {
        (data.length > 0)
          ? <h1>Select a project.</h1>
          : <div className='d-flex flex-column align-items-center'><p>Looks like you don't have any projects.</p> <Button variant='primary'>Create a new project</Button></div>
      }
    </main>
  )
}
