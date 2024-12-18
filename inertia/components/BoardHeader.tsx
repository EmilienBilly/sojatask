import { Board } from '../types/board'

export default function BoardHeader({ board }: { board: Board }) {
  return (
    <div className="px-6 p-4">
      <h1 className="text-xl font-bold">{board.title}</h1>
      <div>{board.description}</div>
    </div>
  )
}
