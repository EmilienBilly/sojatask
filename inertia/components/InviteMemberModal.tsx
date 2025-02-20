import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '#shadcn/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select'
import { Input } from '#shadcn/input'
import { Label } from '#shadcn/label'
import { Button } from '#shadcn/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { router } from '@inertiajs/react'
import RoleDto from '#dtos/role'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
interface InviteMemberModalProps {
  roles: RoleDto[]
}

export default function InviteMemberModal({ roles }: InviteMemberModalProps) {
  const [email, setEmail] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const { activeWorkspace } = usePage<SharedProps>().props

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.post('/workspace/members/invite', {
      email,
      roleId: selectedRole,
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
      <DialogContent>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole} required>
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
