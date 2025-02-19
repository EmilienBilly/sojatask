import { Head, usePage } from '@inertiajs/react'
import WorkspaceDto from '#dtos/workspace'
import { Button } from '#shadcn/button'
import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar'
import { Card, CardTitle, CardHeader, CardContent } from '#shadcn/card'
import { Separator } from '#shadcn/separator'
export default function Workspace() {
  const activeWorkspace = usePage().props.activeWorkspace as WorkspaceDto
  const fakeMembers = [
    { id: 1, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Ethan Hunt', avatar: 'https://i.pravatar.cc/150?img=5' },
  ]

  return (
    <>
      <Head title={activeWorkspace.title} />
      <div className="p-4 mt-8 flex flex-col w-full justify-between max-w-[1200px] mx-auto">
        <Avatar className="h-24 w-24 mb-4 text-2xl">
          <AvatarImage src={activeWorkspace.avatar} alt={activeWorkspace.title} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-5xl">
            {activeWorkspace.title.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">{activeWorkspace.title}</h2>
          <Button>
            <Plus />
            Créer une activité
          </Button>
        </div>
        <p>{activeWorkspace.description}</p>
        <Separator className="my-4" />
        <div className="flex flex-col md:flex-row md:space-x-4 gap-8">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Tableaux</h3>
            {activeWorkspace.boards && activeWorkspace.boards.length > 0 ? (
              activeWorkspace.boards.map((board) => (
                <Card
                  key={board.id}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg text-white mb-4"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{board.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-2">{board.description || 'Aucune description'}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>Cet espace de travail ne possède pas de tableaux pour le moment.</p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Membres</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {fakeMembers.map((member) => (
                <Avatar key={member.id} className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Objectifs</h3>
          <div className="mt-2">
            <p>Votre équipe n’a encore créé aucun objectif</p>
            <p>
              Les objectifs aident votre équipe à rester concentrée sur les résultats à atteindre.
            </p>
            <Button className="mt-4">Créer un objectif</Button>
          </div>
        </div>
      </div>
    </>
  )
}
