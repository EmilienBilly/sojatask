import { BaseModelDto } from '@adocasts.com/dto/base'
import WorkspaceInvite from '#models/workspace_invites'
import WorkspaceDto from '#dtos/workspace'
import UserDto from '#dtos/user'
import RoleDto from '#dtos/role'

export default class WorkspaceInvitesDto extends BaseModelDto {
  declare id: number
  declare workspaceId: number
  declare invitedByUserId: number
  declare canceledByUserId: number | null
  declare email: string
  declare roleId: number
  declare acceptedAt: string | null
  declare canceledAt: string | null
  declare createdAt: string
  declare updatedAt: string
  declare workspace: WorkspaceDto | null
  declare invitedBy: UserDto | null
  declare canceledBy: UserDto | null
  declare role: RoleDto | null

  constructor(workspaceInvite?: WorkspaceInvite) {
    super()

    if (!workspaceInvite) return
    this.id = workspaceInvite.id
    this.workspaceId = workspaceInvite.workspaceId
    this.invitedByUserId = workspaceInvite.invitedByUserId
    this.canceledByUserId = workspaceInvite.canceledByUserId
    this.email = workspaceInvite.email
    this.roleId = workspaceInvite.roleId
    this.acceptedAt = workspaceInvite.acceptedAt?.toISO() ?? null
    this.canceledAt = workspaceInvite.canceledAt?.toISO() ?? null
    this.createdAt = workspaceInvite.createdAt.toISO()!
    this.updatedAt = workspaceInvite.updatedAt.toISO()!
    this.workspace = workspaceInvite.workspace && new WorkspaceDto(workspaceInvite.workspace)
    this.invitedBy = workspaceInvite.invitedBy && new UserDto(workspaceInvite.invitedBy)
    this.canceledBy = workspaceInvite.canceledBy && new UserDto(workspaceInvite.canceledBy)
    this.role = workspaceInvite.role && new RoleDto(workspaceInvite.role)
  }
}
