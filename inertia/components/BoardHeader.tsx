import BoardDto from '#dtos/board'

export default function BoardHeader({ board }: { board: BoardDto }) {
  return (
    <div className="px-6 p-4">
      <h1 className="text-xl font-bold">{board.title}</h1>
      <div>{board.description}</div>
    </div>
  )
}
