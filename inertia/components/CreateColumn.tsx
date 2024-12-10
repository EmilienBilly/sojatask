import { useRef, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '#shadcn/button'
import { BoardType } from '../types/board'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '#shadcn/card'
import { Input } from '#shadcn/input'
import { X } from 'lucide-react'
import useClickOutside from '../hooks/useClickOutside'

type CreateColumnProps = {
  board: BoardType
}

export default function CreateColumn({ board }: CreateColumnProps) {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const { data, setData, post, processing, reset } = useForm({
    title: '',
    boardId: board.id,
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post(`/boards/${board.id}/columns`, {
      onSuccess: () => {
        setIsFormVisible(false)
        reset()
      },
    })
  }

  const cardRef = useRef<HTMLDivElement>(null)
  useClickOutside(cardRef, () => {
    setIsFormVisible(false)
  })

  return (
    <>
      {isFormVisible ? (
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
              <Button variant="ghost" onClick={() => setIsFormVisible(false)}>
                <X />
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Button className="w-72" onClick={() => setIsFormVisible(true)}>
          Ajouter une liste
        </Button>
      )}
    </>
  )
}
