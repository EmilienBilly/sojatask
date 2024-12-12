import { Card, CardContent, CardHeader } from '#shadcn/card'
import EditTaskDialog from '#inertia/EditTaskDialog'
import { useState } from 'react'
import { GripVertical, Pencil } from 'lucide-react'
import { Button } from '#shadcn/button'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Task } from '../types/task'

type TaskCardProps = {
  task: Task
}
export default function TaskCard({ task }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <>
      <Card
        style={style}
        ref={setNodeRef}
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className="rounded-md hover:bg-hovered cursor-pointer group"
      >
        <CardHeader className="px-3 py-3 justify-between items-center flex flex-row border-b-2 border-secondary relative">
          <Button
            {...attributes}
            {...listeners}
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
