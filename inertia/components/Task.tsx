import { TaskType } from '../types/task'
import { Card, CardContent, CardHeader } from '#shadcn/card'
import EditTaskDialog from '#inertia/EditTaskDialog'
import { useState } from 'react'
import { GripVertical, Pencil } from 'lucide-react'
import { Button } from '#shadcn/button'

type TaskCardProps = {
  task: TaskType
}
export default function Task({ task }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className="rounded-md hover:bg-hovered cursor-pointer group"
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
