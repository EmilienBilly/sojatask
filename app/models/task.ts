import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeDelete,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Task extends BaseModel {
  static table = 'task_tasks'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.date()
  declare dueDate: DateTime | null

  @column.date()
  declare startDate: DateTime | null

  @column()
  declare archived: number

  @column()
  declare createdBy: number

  @column()
  declare columnId: number

  @column()
  declare order: number

  @column()
  declare parentId: number | null

  @belongsTo(() => Task, { foreignKey: 'parentId' })
  declare parent: BelongsTo<typeof Task>

  @hasMany(() => Task, { foreignKey: 'parentId' })
  declare subtasks: HasMany<typeof Task>

  @beforeCreate()
  static async setOrder(newTask: Task) {
    const maxOrderColumn = await Task.query()
      .where('column_id', newTask.columnId)
      .orderBy('order', 'desc')
      .first()

    newTask.order = (maxOrderColumn?.order ?? -1) + 1
  }

  @beforeDelete()
  static async deleteSubtasks(task: Task) {
    await task.related('subtasks').query().delete()
  }
}
