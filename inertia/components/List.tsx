import styled from 'styled-components'
import CreateTaskButton from '~/components/CreateTaskButton'
import Task from '~/components/Task'
import { useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import invariant from 'tiny-invariant'
import { TaskType } from '~/types/task'
import { ListType } from '~/types/list'

type ListProps = {
  listId: number
  tasks: TaskType[]
  list: ListType
}

const ListContainer = styled.div<{ $isDraggedOver: boolean }>`
  display: flex;
  gap: 10px;
  border: ${(props) => (props.$isDraggedOver ? '1px solid red' : 'none')};
  border-radius: 8px;
  flex-direction: column;
  padding: 20px;
  background: #d7d7d7;
  min-height: 50px;
  width: 300px;
`
export default function List({ listId, tasks, list }: ListProps) {
  const listRef = useRef(null)
  const [isDraggedOver, setIsDraggedOver] = useState(false)

  useEffect(() => {
    const listElement = listRef.current
    invariant(listElement)

    return dropTargetForElements({
      element: listElement,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ listId }),
      getIsSticky: () => true,
    })
  }, [listId])

  return (
    <>
      <ListContainer $isDraggedOver={isDraggedOver} ref={listRef}>
        <h2>{list.title}</h2>
        {tasks?.map((task) => <Task key={task.id} task={task} />)}
        <CreateTaskButton />
      </ListContainer>
    </>
  )
}
