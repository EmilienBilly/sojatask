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
    <>
      {isFormVisible ? (
        <Card ref={cardRef}>
          <form onSubmit={submit}>
            <CardContent className="p-2">
              <Input
                type="text"
                placeholder="Saisissez un nom pour cette tâche"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                required
              />
            </CardContent>
            <CardFooter className="flex justify-between p-2">
              <Button type="submit" disabled={processing}>
                Ajouter
              </Button>
              <Button variant="ghost" onClick={toggleForm}>
                <X />
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Button variant="outline" className="" onClick={toggleForm}>
          <Plus />
          Nouvelle tâche
        </Button>
      )}
    </>
  )
}
