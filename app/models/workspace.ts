import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Board from '#models/board'
import Users from '#models/user'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Workspace extends BaseModel {
  static table = 'task_workspaces'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare createdBy: number

  @hasMany(() => Board)
  declare boards: HasMany<typeof Board>

  @manyToMany(() => Users, {
    pivotTable: 'task_users_workspaces',
  })
  declare users: ManyToMany<typeof Users>
}
