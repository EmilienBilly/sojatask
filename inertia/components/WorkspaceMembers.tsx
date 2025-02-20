import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '#shadcn/hover-card'
import UserDto from '#dtos/user'
import RoleDto from '#dtos/role'
import InviteMemberModal from './InviteMemberModal'

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
      <div className="flex flex-wrap gap-4">
        {members.map((member) => (
          <HoverCard key={member.id} openDelay={100}>
            <HoverCardTrigger>
              <Avatar className="hover:ring-2 hover:ring-primary/50 transition-all duration-200">
                <AvatarImage src={member.avatar} alt={member.username} />
                <AvatarFallback className="bg-primary text-white">
                  {member.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent side="top" sideOffset={15} align="start">
              <div className="flex justify-between space-x-4">
                <Avatar className="">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-primary text-white">
                    {member.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{`${member.contact?.firstname} ${member.contact?.lastname}`}</h4>
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
        <InviteMemberModal roles={roles} />
      </div>
    </div>
  )
}
