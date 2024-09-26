import styled from 'styled-components'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { ReactNode, useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { TaskType } from '~/types/task'

const Container = styled.div<{ $dragging: boolean }>`
  opacity: ${(props) => (props.$dragging ? '20%' : '100%')};
  background-color: #ffffff;
  border-radius: 8px 12px 4px;
  padding: 8px;
  overflow: hidden;
`

const TaskName = styled.p`
  color: #46444c;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 8px;
`
type TaskCardProps = {
  children: ReactNode
  task: TaskType
}
export default function Task({ task }: TaskCardProps) {
  const taskRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const taskElement = taskRef.current
    invariant(taskElement)

    draggable({
      element: taskElement,
      getInitialData: () => ({ task: task, taskId: task.id }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
    dropTargetForElements({
      element: taskElement,
    })
  }, [])

  return (
    <>
      <Container $dragging={dragging} ref={taskRef}>
        <TaskName>{task.name}</TaskName>
      </Container>
    </>
  )
}
