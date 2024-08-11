import { Head } from '@inertiajs/react'
import CreateProjectForm from '~/components/create_project_form'

export default function CreateProject() {
  return (
    <>
      <Head title="Create project" />
      <div className="container">
        <div className="title">Nouveau projet</div>
        <CreateProjectForm />
      </div>
    </>
  )
}
