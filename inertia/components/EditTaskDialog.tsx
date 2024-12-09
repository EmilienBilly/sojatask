import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '#shadcn/dialog'
import { TaskType } from '../types/task'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { useForm } from '@inertiajs/react'
import { toast } from 'sonner'

type EditTaskDialogProps = {
  task: TaskType
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    description: '',
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create_board', {
      onSuccess: () => {
        reset()
        toast.success('Tableau créé')
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>Modifier la tâche</DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            {errors.title && <div>{errors.title}</div>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
