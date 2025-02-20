import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar'
import { Button } from '#shadcn/button'
import { Plus } from 'lucide-react'
import UserDto from '#dtos/user'

interface WorkspaceMembersProps {
  members: UserDto[]
}

export default function WorkspaceMembers({ members }: WorkspaceMembersProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6">Membres</h3>
      <div className="flex flex-wrap gap-3">
        {members.map((member) => (
          <Avatar
            key={member.id}
            className="hover:ring-2 hover:ring-primary/50 transition-all duration-200"
          >
            <AvatarImage src={member.avatar} alt={member.username} />
            <AvatarFallback className="bg-primary text-white">
              {member.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full border-2 border-dashed border-gray-300 hover:border-primary transition-colors duration-200"
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}
