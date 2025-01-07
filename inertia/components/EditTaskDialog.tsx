import { Dialog, DialogContent, DialogHeader, DialogTitle } from '#shadcn/dialog'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { useForm } from '@inertiajs/react'
import TaskDto from '#dtos/task'
import DatePicker from '#inertia/DatePicker'
import { DateTime } from 'luxon'
import { Button } from '#shadcn/button'

type EditTaskDialogProps = {
  task: TaskDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const { data, setData, put, processing, reset, errors } = useForm({
    title: task.title || '',
    description: task.description || '',
    dueDate: task.dueDate || null,
  })

  const handleDateChange = (date: DateTime | undefined) => {
    const isoDate = date?.toISO() || null
    setData('dueDate', isoDate)
  }

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    put(`/tasks/${task.id}`, {
      // onSuccess: () => {
      //   reset()
      //   onOpenChange(false)
      // },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-8">
          <div className="grid gap-2">
            <Label htmlFor="title">Description</Label>
            <Input
              id="title"
              type="text"
              value={data.description}
              onChange={(e) => setData('title', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="dueDate">Date limite</Label>
            <DatePicker
              date={data.dueDate ? DateTime.fromISO(data.dueDate).toISO() : null}
              onDateChange={handleDateChange}
            />
            {errors.title && <div>{errors.title}</div>}
          </div>
          <Button type="submit" disabled={processing}>
            Enregistrer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
