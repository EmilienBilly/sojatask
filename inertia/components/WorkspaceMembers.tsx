import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar'
import { Button } from '#shadcn/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '#shadcn/hover-card'
import { Plus } from 'lucide-react'
import UserDto from '#dtos/user'
import RoleDto from '#dtos/role'
interface WorkspaceMembersProps {
  members: UserDto[]
  roles: RoleDto[]
}

export default function WorkspaceMembers({ members, roles }: WorkspaceMembersProps) {
  const getRoleName = (roleId: number) => {
    return roles.find((role) => role.id === roleId)?.name
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6">Membres</h3>
      <div className="flex flex-wrap gap-3">
        {members.map((member) => (
          <HoverCard key={member.id} openDelay={200}>
            <HoverCardTrigger>
              <Avatar className="hover:ring-2 hover:ring-primary/50 transition-all duration-200">
                <AvatarImage src={member.avatarUrl} alt={member.username} />
                <AvatarFallback className="bg-primary text-white">
                  {member.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent side="top" align="start" className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatarUrl} />
                  <AvatarFallback className="bg-primary text-white">
                    {member.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{member.username}</h4>
                  <p className="text-sm text-muted-foreground">{member.contact?.email}</p>
                  <div className="flex items-center pt-2">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {getRoleName(member.meta.pivot_role_id)}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
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
