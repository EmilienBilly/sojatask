import { InferPageProps } from '@adonisjs/inertia/types'
import BoardsController from '#controllers/boards/boards_controller'
import { BoardType } from '~/types/board'

export default function Board(props: InferPageProps<BoardsController, 'show'>) {
  console.log(props)
  const board: BoardType = props.board
  return (
    <>
      <h1>{board.title}</h1>
      <div>{board.description}</div>
    </>
  )
}
