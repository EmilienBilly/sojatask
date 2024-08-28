import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import UserProjectsController from '#controllers/projects/user_projects_controller'
import CreateBoardButton from '~/components/CreateBoardButton'
import CreateBoardModal from '~/components/CreateBoardModal'
import { useState } from 'react'
import styled from 'styled-components'

const HorizontalRule = styled.hr``
export default function UserProject(props: InferPageProps<UserProjectsController, 'show'>) {
  const project = props.project
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Head title="Projet" />
      <div>
        <h1 className="title">{project.title}</h1>
        <p>{project.description}</p>
      </div>
      <HorizontalRule />
      <div>
        <CreateBoardButton showModal={showModal} setShowModal={setShowModal} />
        {showModal && <CreateBoardModal />}
      </div>
    </>
  )
}
