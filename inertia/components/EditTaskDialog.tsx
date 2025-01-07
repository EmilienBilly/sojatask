import { Dialog, DialogContent, DialogHeader, DialogTitle } from '#shadcn/dialog'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { useForm } from '@inertiajs/react'
import TaskDto from '#dtos/task'
import DatePicker from '#inertia/DatePicker'

type EditTaskDialogProps = {
  task: TaskDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    description: '',
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-8">
          <div className="grid gap-2">
            <Label htmlFor="title">Description</Label>
            <Input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="title">Date limite</Label>
            <DatePicker date={task.dueDate} />
            {errors.title && <div>{errors.title}</div>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
