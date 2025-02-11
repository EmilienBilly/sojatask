import { router, useForm } from '@inertiajs/react'
import { Plus, X } from 'lucide-react'
import { Input } from '#shadcn/input'
import { Button } from '#shadcn/button'
import { Card, CardContent, CardFooter } from '#shadcn/card'
import { useToggle } from '../hooks/useToggle'
import { useRef } from 'react'
import useClickOutside from '../hooks/useClickOutside'

type CreateTaskButtonProps = {
  columnId: number
}
export default function CreateTask({ columnId }: CreateTaskButtonProps) {
  const [isFormVisible, toggleForm] = useToggle()

  const { data, setData, post, processing, reset } = useForm({
    title: '',
    columnId: columnId,
  })

  const cardRef = useRef<HTMLDivElement>(null)
  useClickOutside(cardRef, () => {
    toggleForm()
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create-task', {
      preserveScroll: true,
      onSuccess: () => {
        toggleForm()
        reset()
        router.reload()
      },
    })
  }

  return (
    <div className="flex flex-col gap-2 w-auto">
      {isFormVisible ? (
        <form onSubmit={submit}>
          <div ref={cardRef} className="flex flex-col gap-2">
            <Input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="Titre de la tâche"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={processing}>
                Ajouter
              </Button>
              <Button onClick={toggleForm} variant="outline">
                Annuler
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <Button
          variant="ghost"
          onClick={toggleForm}
          className="w-full justify-start text-muted-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une tâche
        </Button>
      )}
    </div>
  )
}
