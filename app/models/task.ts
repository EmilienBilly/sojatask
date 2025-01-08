import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class Task extends BaseModel {
  static table = 'task_tasks'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

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

  @beforeCreate()
  static async setOrder(newTask: Task) {
    const maxOrderColumn = await Task.query()
      .where('column_id', newTask.columnId)
      .orderBy('order', 'desc')
      .first()

    newTask.order = (maxOrderColumn?.order ?? -1) + 1
  }
}
