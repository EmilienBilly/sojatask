// AddSubTask.tsx
import { FormEvent, useState } from 'react'
import { Input } from '#shadcn/input'
import { Button } from '#shadcn/button'
import { useForm } from '@inertiajs/react'

type AddSubTaskProps = {
  form: ReturnType<typeof useForm>
  onSubmit: (e: FormEvent) => void
}

export function AddSubTask({ form, onSubmit }: AddSubTaskProps) {
  const [isAdding, setIsAdding] = useState(false)

  function handleCancel() {
    setIsAdding(false)
  }

  return (
    <div className="flex flex-col gap-2">
      {isAdding ? (
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              value={form.data.title}
              onChange={(e) => form.setData('title', e.target.value)}
              placeholder="Titre de la sous-tâche"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={form.processing}>
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
