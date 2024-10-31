import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import List from '#models/list'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Board extends BaseModel {
  static table = 'task_boards'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare projectId: number

  @hasMany(() => List)
  declare lists: HasMany<typeof List>
}
