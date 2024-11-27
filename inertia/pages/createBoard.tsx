import { useForm, usePage } from '@inertiajs/react'
import { Label } from '#shadcn/label'
import { Button } from '#shadcn/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#shadcn/card'
import { Input } from '#shadcn/input'
import { Textarea } from '#shadcn/textarea'
import useError from '../hooks/useError'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#shadcn/select'
import { SharedProps } from '@adonisjs/inertia/types'

export default function CreateBoard() {
  const { workspaces } = usePage<SharedProps>().props
  const { activeWorkspace } = usePage<SharedProps>().props
  const titleError = useError('title')
  const { data, setData, post, processing, reset } = useForm({
    title: '',
    description: '',
    workspaceId: '',
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/create_board', {
      onSuccess: () => {
        reset()
      },
    })
  }

  console.log(data.workspaceId)
  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Nouveau tableau</CardTitle>
        <CardDescription>Ajouter un nouveau tableau dans un espace de travail</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              type="text"
              required
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            {titleError && <div>{titleError}</div>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="workspace">Espace de travail</Label>
            <Select
              value={data.workspaceId}
              onValueChange={(value) => setData('workspaceId', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={activeWorkspace.title} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {workspaces.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id.toString()}>
                      {workspace.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={processing}>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
