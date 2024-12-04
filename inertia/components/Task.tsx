import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
import { TaskType } from '../types/task'
import { Card, CardHeader, CardTitle } from '#shadcn/card'

type TaskCardProps = {
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
      <Card className="rounded-md" ref={taskRef}>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
