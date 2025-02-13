import { Head, useForm, usePage } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '#shadcn/card'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { Button } from '#shadcn/button'
import { toast } from 'sonner'
import WorkspaceDto from '#dtos/workspace'

export default function Workspace() {
  const activeWorkspace = usePage().props.activeWorkspace as WorkspaceDto
  const { data, setData, post, processing, errors } = useForm({
    title: activeWorkspace.title,
    description: activeWorkspace.description,
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post(`/workspaces/${activeWorkspace.id}`, {
      onSuccess: () => toast('Espace de travail mis à jour avec succès'),
    })
  }

  const fakeBoards = [
    { id: 1, title: 'Board 1', description: 'Description for Board 1' },
    { id: 2, title: 'Board 2', description: 'Description for Board 2' },
    { id: 3, title: 'Board 3', description: 'Description for Board 3' },
    { id: 4, title: 'Board 4', description: 'Description for Board 4' },
    { id: 5, title: 'Board 5', description: 'Description for Board 5' },
  ]

  return (
    <>
      <Head title="Détails de l'espace de travail" />
      <Card className="mx-auto w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Détails de l'espace de travail</CardTitle>
          <CardDescription>Modifier les informations de l'espace de travail</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-4">
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
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
              {errors.description && <div>{errors.description}</div>}
            </div>
            <Button type="submit" className="w-full" disabled={processing}>
              Mettre à jour
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 w-72 self-center">
        {fakeBoards.map((board) => (
          <div key={board.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{board.title}</h3>
            <p>{board.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
