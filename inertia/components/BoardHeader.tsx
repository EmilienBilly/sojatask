import { BoardType } from '../types/board'

export default function BoardHeader({ board }: { board: BoardType }) {
  return (
    <div className="px-6 p-4">
      <div>{board.title}</div>
      <div>{board.description}</div>
    </div>
  )
}
