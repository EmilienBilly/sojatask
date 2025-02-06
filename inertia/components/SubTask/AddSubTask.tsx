import { useState } from 'react'
import { Input } from '#shadcn/input'
import { Button } from '#shadcn/button'
import { useForm } from '@inertiajs/react'

type AddSubTaskProps = {
  taskId: number
}

export function AddSubTask({ taskId }: AddSubTaskProps) {
  const [isAdding, setIsAdding] = useState(false)

  function handleCancel() {
    setIsAdding(false)
  }

  const { data, setData, post, processing } = useForm({
    title: '',
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post(`/tasks/${taskId}/subtasks`)
  }

  return (
    <div className="flex flex-col gap-2">
      {isAdding ? (
        <form onSubmit={submit}>
          <div className="flex flex-col gap-2">
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
        <Button onClick={() => setIsAdding(true)}>Ajouter une sous-tâche</Button>
      )}
    </div>
  )
}
