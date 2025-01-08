import { Dialog, DialogContent, DialogHeader, DialogTitle } from '#shadcn/dialog'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { useForm } from '@inertiajs/react'
import TaskDto from '#dtos/task'
import DatePicker from '#inertia/DatePicker'
import { DateTime } from 'luxon' // Assure-toi d'importer luxon
import { Button } from '#shadcn/button'
import { useEffect } from 'react'

type EditTaskDialogProps = {
  task: TaskDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const { data, setData, put, processing, errors } = useForm({
    title: task.title || '',
    description: task.description || '',
    dueDate: task.dueDate || null,
    startDate: task.startDate || null,
  })

  // Fonction pour gérer les changements de dates depuis le DatePicker
  const handleDateChange = (startDate: string | null, dueDate: string | null) => {
    // Convertir les chaînes ISO en objets DateTime ou null
    const convertedStartDate = startDate ? DateTime.fromISO(startDate) : null
    const convertedDueDate = dueDate ? DateTime.fromISO(dueDate) : null
    // Si `setData` attend une chaîne ISO, reconvertir les objets DateTime en ISO ou null
    setData('startDate', convertedStartDate ? convertedStartDate.toISO() : null)
    setData('dueDate', convertedDueDate ? convertedDueDate.toISO() : null)
    console.log(convertedStartDate)
    console.log(data.startDate)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

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
          <div className="grid gap-2">
            <Label htmlFor="title">Description</Label>
            <Input
              id="title"
              type="text"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="dueDate">Date limite</Label>
            <DatePicker
              startDate={task.startDate ? new Date(task.startDate) : undefined}
              dueDate={task.dueDate ? new Date(task.dueDate) : undefined}
              onDateChange={handleDateChange} // Pass handleDateChange
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
