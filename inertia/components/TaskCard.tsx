import { Card, CardContent, CardHeader } from '#shadcn/card'
import EditTaskDialog from '#inertia/EditTaskDialog'
import { useEffect, useRef, useState } from 'react'
import { GripVertical, Pencil } from 'lucide-react'
import { Button } from '#shadcn/button'
import { Task } from '../types/task'
import { cva } from 'class-variance-authority'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import invariant from 'tiny-invariant'

type TaskCardProps = {
  task: Task
  columnId: number
}
export default function TaskCard({ columnId, task }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dragging, setDragging] = useState<boolean>(false)
  const [isDraggedOver, setIsDraggedOver] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    const draggableElement = ref.current
    invariant(draggableElement)
    return draggable({
      element: draggableElement,
      getInitialData: () => ({ card: task }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
  }, [])

  useEffect(() => {
    const draggedOverElement = ref.current
    invariant(draggedOverElement)

    return dropTargetForElements({
      element: draggedOverElement,
      getData: () => ({ columnId, taskId: task.id }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    })
  }, [])

  const variants = cva('hover:bg-hovered cursor-pointer group', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  })

  return (
    <>
      <Card
        ref={ref}
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className={variants({
          dragging: dragging ? 'over' : undefined,
        })}
      >
        <CardHeader className="px-3 py-3 justify-between items-center flex flex-row border-b-2 border-secondary relative">
          <Button
            variant={'ghost'}
            className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
          >
            <span className="sr-only">Move task</span>
            <GripVertical />
          </Button>
          <Pencil
            size={16}
            strokeWidth={2}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 m-0"
          />
        </CardHeader>
        <CardContent className="px-3 pt-3 pb-6 text-left">{task.title}</CardContent>
      </Card>
      <EditTaskDialog open={isDialogOpen} task={task} onOpenChange={setIsDialogOpen} />
    </>
  )
}
