import { useRef } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '#shadcn/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '#shadcn/card'
import { Input } from '#shadcn/input'
import { X } from 'lucide-react'
import useClickOutside from '../hooks/useClickOutside'
import BoardDto from '#dtos/board'
import { useToggle } from '../hooks/useToggle'

type CreateColumnProps = {
  board: BoardDto
}

export default function CreateColumn({ board }: CreateColumnProps) {
  const [isOpen, toggle] = useToggle()

  const { data, setData, post, processing, reset } = useForm({
    title: '',
    boardId: board.id,
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post(`/boards/${board.id}/columns`, {
      onSuccess: () => {
        toggle()
        reset()
      },
    })
  }

  const cardRef = useRef<HTMLDivElement>(null)
  useClickOutside(cardRef, () => {
    toggle()
  })

  return (
    <>
      {isOpen ? (
        <Card ref={cardRef} className="w-72">
          <CardHeader>
            <CardTitle>Nouvelle liste</CardTitle>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent>
              <Input
                type="text"
                placeholder="Saisissez le nom de la liste"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                required
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" disabled={processing}>
                Ajouter
              </Button>
              <Button variant="ghost" onClick={toggle}>
                <X />
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Button className="w-72" onClick={toggle}>
          Ajouter une liste
        </Button>
      )}
    </>
  )
}
