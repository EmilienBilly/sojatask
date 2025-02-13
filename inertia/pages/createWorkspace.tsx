import { Head, useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#shadcn/card'
import { Label } from '#shadcn/label'
import { Input } from '#shadcn/input'
import { Textarea } from '#shadcn/textarea'
import { Button } from '#shadcn/button'
import { toast } from 'sonner'
import { ReactNode } from 'react'
import AuthLayout from '#layouts/AuthLayout'

export default function CreateWorkspace() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
  })

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault()
    post('/workspaces', {
      onSuccess: () => toast('Espace de travail créé avec succès'),
    })
  }

  return (
    <>
      <Head title="Create project" />
      <Card className="mx-auto w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Nouveau workspace</CardTitle>
          <CardDescription>Ajouter un nouveau workspace</CardDescription>
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
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
              {errors.description && <div>{errors.description}</div>}
            </div>
            <Button type="submit" className="w-full" disabled={processing}>
              Créer
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

CreateWorkspace.layout = (page: ReactNode) => <AuthLayout children={page} />
