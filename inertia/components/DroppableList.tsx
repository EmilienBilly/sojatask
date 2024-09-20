import { useDroppable } from '@dnd-kit/core'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f0eefc;
  min-height: 50px;
  width: 300px;
  border: 3px;
`
export default function DroppableList(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })
  return (
    <>
      <List ref={setNodeRef}>{props.children}</List>
    </>
  )
}
