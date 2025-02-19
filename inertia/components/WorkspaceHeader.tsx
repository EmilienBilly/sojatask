import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar'
import { Button } from '#shadcn/button'
import { Plus } from 'lucide-react'
import type WorkspaceDto from '#dtos/workspace'

interface WorkspaceHeaderProps {
  workspace: WorkspaceDto
}

export default function WorkspaceHeader({ workspace }: WorkspaceHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24 text-2xl ring-2 ring-border hover:ring-primary transition-all">
          <AvatarImage src={workspace.avatarUrl} alt={workspace.title} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-5xl">
            {workspace.title.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">{workspace.title}</h2>
            <Button className="gap-2 hover:scale-105 transition-transform">
              <Plus className="h-5 w-5" />
              Créer une activité
            </Button>
          </div>
          <p className="text-muted-foreground leading-relaxed">{workspace.description}</p>
        </div>
      </div>
    </div>
  )
}
