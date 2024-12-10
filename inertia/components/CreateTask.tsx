import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Plus, X } from 'lucide-react'
import { Input } from '#shadcn/input'
import { Button } from '#shadcn/button'
import { Card, CardContent, CardFooter } from '#shadcn/card'

type CreateTaskButtonProps = {
  columnId: number
}
export default function CreateTask({ columnId }: CreateTaskButtonProps) {
  console.log(columnId)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const { data, setData, post, processing, reset } = useForm({
    title: '',
    columnId: columnId,
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create-task', {
      onSuccess: () => {
        setIsFormVisible(false)
        reset()
      },
    })
  }

  return (
    <>
      {isFormVisible ? (
        <Card>
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
              <Button variant="ghost" onClick={() => setIsFormVisible(false)}>
                <X />
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Button variant="outline" className="" onClick={() => setIsFormVisible(true)}>
          <Plus />
          Nouvelle tâche
        </Button>
      )}
    </>
  )
}
