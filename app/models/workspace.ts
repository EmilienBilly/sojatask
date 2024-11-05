import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Board from '#models/board'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Workspace extends BaseModel {
  static table = 'task_workspaces'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare createdBy: number

  @hasMany(() => Board)
  declare boards: HasMany<typeof Board>
}
