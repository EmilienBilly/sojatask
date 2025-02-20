import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '#shadcn/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select'
import { Input } from '#shadcn/input'
import { Label } from '#shadcn/label'
import { Button } from '#shadcn/button'
import { Plus } from 'lucide-react'
import RoleDto from '#dtos/role'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/react'
import ROLES from '#enums/roles'

interface InviteMemberModalProps {
  roles: RoleDto[]
}

export default function InviteMemberModal({ roles }: InviteMemberModalProps) {
  const { activeWorkspace } = usePage<SharedProps>().props

  const inviteForm = useForm({
    email: '',
    roleId: ROLES.MEMBER,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    inviteForm.post('/workspace/members/invite', {
      onSuccess: () => inviteForm.reset(),
      preserveScroll: true,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full border-2 border-dashed border-gray-300 hover:border-primary transition-colors duration-200"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[560px]">
        <DialogHeader>
          <DialogTitle>Inviter un membre à rejoindre {activeWorkspace.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemple.com"
              value={inviteForm.data.email}
              onChange={(e) => inviteForm.setData('email', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select
              defaultValue={inviteForm.data.roleId.toString()}
              onValueChange={(value: string) => {
                inviteForm.setData('roleId', Number(value) as ROLES)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Inviter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
