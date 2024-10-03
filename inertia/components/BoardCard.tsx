import styled from 'styled-components'
import type { BoardType } from '~/types/board'

type BoardCardProps = {
  board: BoardType
}
const Card = styled.a`
  background-color: #8b64fd;
  border-radius: 3px;
  width: 200px;
  @media (max-width: 425px) {
    width: 40%; /* Augmente la taille du texte pour les écrans moyens */
  }
  padding: 15px;
  color: #f7f8fa;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-between;
  position: relative;
`

const BoardTitle = styled.div`
  display: inline-block;
  flex: 0 0 auto;
  font-size: 16px;
  font-weight: 700;
  max-height: 40px;
  overflow: hidden;
  width: 100%;
  word-wrap: break-word;
`

export default function BoardCard({ board }: BoardCardProps) {
  console.log(board)
  return (
    <Card href={`/user_projects/${board.projectId}/boards/${board.id}`}>
      <Div>
        <BoardTitle>{board.title}</BoardTitle>
      </Div>
    </Card>
  )
}
