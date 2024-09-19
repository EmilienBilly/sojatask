import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { BoardType } from '~/types/board'
import styled from 'styled-components'
import CreateListButton from '~/components/CreateListButton'

const BoardCanva = styled.div`
  flex-grow: 1;
  margin-top: 12px;
  position: relative;
`
export default function Board(props: InferPageProps<BoardsController, 'show'>) {
  console.log(props)
  const board: BoardType = props.board
  return (
    <>
      <h1>{board.title}</h1>
      <div>{board.description}</div>
      <BoardCanva>
        <CreateListButton />
      </BoardCanva>
    </>
  )
}
