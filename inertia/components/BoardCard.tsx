import styled from 'styled-components'

type BoardCardProps = {
  title: string
}

const Card = styled.div`
  background-color: #5a45ff;
  border-radius: 3px;
  width: 200px;
  padding: 15px;
  margin-right: 15px;
  color: #f7f8fa;
`
export default function BoardCard({ title }: BoardCardProps) {
  return (
    <Card>
      <h3>{title}</h3>
    </Card>
  )
}
