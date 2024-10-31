import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Task from '#models/task'

export default class List extends BaseModel {
  static table = 'task_lists'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare boardId: number

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>
}
