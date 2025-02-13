import { BaseModel, beforeCreate, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Task from '#models/task'
import Board from '#models/board'
import { WithWorkspace } from '#models/mixins/with_workspace'
import { compose } from '@adonisjs/core/helpers'

export default class Column extends compose(BaseModel, WithWorkspace) {
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

  @belongsTo(() => Board)
  declare board: BelongsTo<typeof Board>

  @beforeCreate()
  static async setOrder(newColumn: Column) {
    const maxOrderColumn = await Column.query()
      .where('board_id', newColumn.boardId)
      .orderBy('order', 'desc')
      .first()

    newColumn.order = (maxOrderColumn?.order ?? -1) + 1
  }
}
