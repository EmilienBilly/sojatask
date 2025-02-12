import TaskDto from '#dtos/task'
import { usePage } from '@inertiajs/react'

type TaskDateStatusProps = {
  dueDate?: string | Date | null
  currentDate?: Date
}

export default function TaskDateStatus({ dueDate, currentDate = new Date() }: TaskDateStatusProps) {
  const task = usePage().props.task as TaskDto
  const parsedDueDate = dueDate ? new Date(dueDate) : undefined

  if (task.completed) {
    return (
      <span className="rounded-sm p-0.5 text-sm font-medium text-green-600 bg-green-200">
        Complété
      </span>
    )
  }

  const isOverdue =
    parsedDueDate &&
    currentDate > parsedDueDate &&
    currentDate.toDateString() !== parsedDueDate.toDateString()

  if (!dueDate || !isOverdue) {
    return null
  }

  return (
    <span className="rounded-sm p-0.5 text-sm font-medium text-red-600 bg-red-200">En retard</span>
  )
}
