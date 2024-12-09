import { TaskType } from '../types/task'
import { Card, CardHeader, CardTitle } from '#shadcn/card'
import EditTaskDialog from '#inertia/EditTaskDialog'
import { useState } from 'react'

type TaskCardProps = {
  task: TaskType
}
export default function Task({ task }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <Card
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className="rounded-md hover:bg-hovered cursor-pointer"
      >
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
      </Card>
      <EditTaskDialog open={isDialogOpen} task={task} onOpenChange={setIsDialogOpen} />
    </>
  )
}
