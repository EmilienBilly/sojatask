import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Workspace from './workspace.js'
import User from './user.js'
import Role from './role.js'

export default class WorkspaceInvite extends BaseModel {
  static table = 'task_workspace_invites'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare workspaceId: number

  @column()
  declare invitedByUserId: number

  @column()
  declare canceledByUserId: number | null

  @column()
  declare email: string

  @column()
  declare roleId: number

  @column.dateTime()
  declare acceptedAt: DateTime | null

  @column.dateTime()
  declare canceledAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Workspace)
  declare workspace: BelongsTo<typeof Workspace>

  @belongsTo(() => User)
  declare invitedBy: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare canceledBy: BelongsTo<typeof User>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
