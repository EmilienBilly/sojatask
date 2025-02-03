import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '#shadcn/dialog'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { useForm } from '@inertiajs/react'
import TaskDto from '#dtos/task'
import { Button } from '#shadcn/button'
import DatePicker from '#inertia/DatePicker'
import { SubTaskList } from '#inertia/SubTask/SubTaskList'
import { AddSubTask } from '#inertia/SubTask/AddSubTask'
import { FormEvent } from 'react'

type EditTaskDialogProps = {
  task: TaskDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TaskEditDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const { data, setData, put, processing } = useForm({
    title: task.title || '',
    description: task.description || '',
    dueDate: task.dueDate || null,
    startDate: task.startDate || null,
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    put(`/tasks/${task.id}`)
  }

  const subtaskForm = useForm({
    title: '',
  })

  function handleAddSubtask(e: FormEvent) {
    e.preventDefault()
    // Centralize the subtask creation logic here
    subtaskForm.post(`/tasks/${task.id}/subtasks`, {
      onSuccess: () => {
        // Reset the form
        subtaskForm.reset()
        // Potentially refresh subtask list or perform other actions
      },
      onError: (errors) => {
        // Handle any validation errors
        console.error('Subtask creation errors:', errors)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <DatePicker
              taskId={task.id}
              startDate={task.startDate ? new Date(task.startDate) : undefined}
              dueDate={task.dueDate ? new Date(task.dueDate) : undefined}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
          </div>
          <SubTaskList />
          <AddSubTask form={subtaskForm} onSubmit={handleAddSubtask} />
          <Button type="submit" disabled={processing}>
            Enregistrer
          </Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
