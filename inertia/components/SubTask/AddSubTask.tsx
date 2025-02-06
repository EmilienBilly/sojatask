import { Input } from '#shadcn/input'
import { Button } from '#shadcn/button'
import { useForm } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import { useToggle } from '../../hooks/useToggle'
import { useRef } from 'react'
import useClickOutside from '../../hooks/useClickOutside'

type AddSubTaskProps = {
  taskId: number
}

export function AddSubTask({ taskId }: AddSubTaskProps) {
  const [isAdding, toggle] = useToggle()

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => {
    toggle()
  })

  const { data, setData, post, processing, reset } = useForm({
    title: '',
  })

  function handleCancel() {
    toggle()
    setData('title', '')
  }

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post(`/tasks/${taskId}/subtasks`, {
      onSuccess: () => {
        toggle()
        reset()
      },
    })
  }

  return (
    <div className="flex flex-col gap-2 w-auto">
      {isAdding ? (
        <form onSubmit={submit}>
          <div ref={ref} className="flex flex-col gap-2">
            <Input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="Titre de la sous-tâche"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={processing}>
                Ajouter
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Annuler
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <Button variant="outline" size="sm" onClick={() => toggle()} className="self-start">
          <Plus /> Ajouter une sous-tâche
        </Button>
      )}
    </div>
  )
}
