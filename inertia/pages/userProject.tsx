import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import UserProjectsController from '#controllers/projects/user_projects_controller'
import CreateBoardButton from '~/components/CreateBoardButton'
import CreateBoardModal from '~/components/CreateBoardModal'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import BoardCard from '~/components/BoardCard'
import useClickOutside from '~/hooks/useClickOutside'
import { BoardType } from '~/types/board'
import { ProjectType } from '~/types/project'

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
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => {
    if (showModal) setShowModal(false)
  })

  return (
    <>
      <Head title="Projet" />
      <div>
        <h1 className="title">{project.name}</h1>
        <p>{project.description}</p>
      </div>
      <HorizontalRule />
      <div ref={modalRef}>
        <CreateBoardButton showModal={showModal} setShowModal={setShowModal} />
        {showModal && <CreateBoardModal projectId={project.id} />}
      </div>
      <HorizontalRule />
      <BoardsContainer>{boards?.map((board) => <BoardCard board={board} />)}</BoardsContainer>
    </>
  )
}
