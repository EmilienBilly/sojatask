import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Task from '#models/task'

export default class Column extends BaseModel {
  static table = 'task_columns'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare boardId: number

  @column()
  declare order: number

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  @beforeCreate()
  static async setOrder(newColumn: Column) {
    const maxOrderColumn = await Column.query()
      .where('board_id', newColumn.boardId)
      .orderBy('order', 'desc')
      .first()

    newColumn.order = (maxOrderColumn?.order ?? -1) + 1
  }
}
