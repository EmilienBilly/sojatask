import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '#shadcn/hover-card'
import UserDto from '#dtos/user'

interface MemberHoverCardProps {
  member: UserDto
}

export default function MemberHoverCard({ member }: MemberHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar className="hover:ring-2 hover:ring-primary/50 transition-all duration-200">
          <AvatarImage src={member.avatarUrl} alt={member.username} />
          <AvatarFallback className="bg-primary text-white">
            {member.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={member.avatarUrl} />
            <AvatarFallback className="bg-primary text-white">
              {member.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{member.username}</h4>
            <p className="text-sm text-muted-foreground">{member.email}</p>
            <div className="flex items-center pt-2">
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {member.role}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
} 