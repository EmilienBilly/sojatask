import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Column from '#models/column'

export default class Board extends BaseModel {
  static table = 'task_boards'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare workspaceId: number

  @hasMany(() => Column)
  declare columns: HasMany<typeof Column>
}
