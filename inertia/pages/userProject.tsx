import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import UserProjectsController from '#controllers/projects/user_projects_controller'

export default function UserProject(props: InferPageProps<UserProjectsController, 'show'>) {
  const project = props.project
  return (
    <>
      <Head title="Projet" />
      <div className="container">
        <div className="title">{project.title}</div>
        <p>{project.description}</p>
      </div>
    </>
  )
}
