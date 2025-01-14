import { Dialog, DialogContent, DialogHeader, DialogTitle } from '#shadcn/dialog'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { useForm } from '@inertiajs/react'
import TaskDto from '#dtos/task'
import { Button } from '#shadcn/button'
import DatePicker from '#inertia/DatePicker'

type EditTaskDialogProps = {
  task: TaskDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
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
              startDate={data.startDate ? new Date(data.startDate) : undefined}
              dueDate={data.dueDate ? new Date(data.dueDate) : undefined}
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
          <Button type="submit" disabled={processing}>
            Enregistrer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
