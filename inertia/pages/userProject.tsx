import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import UserProjectsController from '#controllers/projects/user_projects_controller'
import CreateBoardButton from '~/components/CreateBoardButton'
import CreateBoardModal from '~/components/CreateBoardModal'
import { useState } from 'react'
import styled from 'styled-components'
import BoardCard from '~/components/BoardCard'
import { BoardType } from '~/types/board'

type ProjectType = {
  id: number
  name: string
  description: string
  createdBy: number
}

const HorizontalRule = styled.hr`
  margin: 20px 0;
`

const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`
export default function UserProject(props: InferPageProps<UserProjectsController, 'show'>) {
  const project: ProjectType = props.project
  const boards: BoardType[] | undefined = props.boards
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Head title="Projet" />
      <div>
        <h1 className="title">{project.name}</h1>
        <p>{project.description}</p>
      </div>
      <HorizontalRule />
      <div>
        <CreateBoardButton showModal={showModal} setShowModal={setShowModal} />
        {showModal && <CreateBoardModal projectId={project.id} />}
      </div>
      <HorizontalRule />
      <BoardsContainer>{boards?.map((board) => <BoardCard board={board} />)}</BoardsContainer>
    </>
  )
}
