import { BaseModelDto } from '@adocasts.com/dto/base'
import Task from '#models/task'

export default class TaskDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare createdAt: string
  declare updatedAt: string
  declare archived: number
  declare dueDate: string | null
  declare startDate: string | null
  declare createdBy: number
  declare columnId: number
  declare order: number

  constructor(task?: Task) {
    super()

    if (!task) return
    this.id = task.id
    this.title = task.title
    this.description = task.description
    this.createdAt = task.createdAt.toISO()!
    this.updatedAt = task.updatedAt.toISO()!
    this.archived = task.archived
    this.dueDate = task.dueDate?.toISO() ?? null
    this.startDate = task.startDate?.toISO() ?? null
    this.createdBy = task.createdBy
    this.columnId = task.columnId
    this.order = task.order
  }
}
