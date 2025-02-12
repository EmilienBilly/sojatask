import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '#shadcn/dialog'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import DatePicker from '#inertia/DatePicker'
import { SubTaskList } from '#inertia/SubTask/SubTaskList'
import { AddSubTask } from '#inertia/SubTask/AddSubTask'
import { usePage } from '@inertiajs/react'
import TaskDto from '#dtos/task'
import { TaskCheckbox } from './TaskCheckbox'

type TaskEditDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TaskEditDialog({ open, onOpenChange }: TaskEditDialogProps) {
  const task = usePage().props.task as TaskDto
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <TaskCheckbox taskId={task.id} completed={task.completed} />
            <DialogTitle>{task.title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <DatePicker
              taskId={task.id}
              startDate={task.startDate ? new Date(task.startDate) : undefined}
              dueDate={task.dueDate ? new Date(task.dueDate) : undefined}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" type="text" value={task.description ?? ''} />
          </div>
          {task.subtasks.length > 0 && <SubTaskList subtasks={task.subtasks} />}
          <AddSubTask taskId={task.id} />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
