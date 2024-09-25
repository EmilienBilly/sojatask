import { useDroppable } from '@dnd-kit/core'
import styled from 'styled-components'
import CreateTaskButton from '~/components/CreateTaskButton'
import React from 'react'

type DroppableListProps = {
  id: number
  title: string
  tasks: object
  children?: React.ReactNode
}
const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f0eefc;
  min-height: 50px;
  width: 300px;
  border: 3px;
`
export default function DroppableList(props: DroppableListProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })
  return (
    <>
      <List ref={setNodeRef}>
        <h2>{props.title}</h2>
        {props.children}
        <CreateTaskButton />
      </List>
    </>
  )
}
