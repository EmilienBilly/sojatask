import { BaseModelDto } from '@adocasts.com/dto/base'
import Task from '#models/task'

export default class TaskDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare description: string
  declare createdAt: string
  declare updatedAt: string
  declare archived: number
  declare deadline: number
  declare createdBy: number
  declare listId: number

  constructor(task?: Task) {
    super()

    if (!task) return
    this.id = task.id
    this.name = task.name
    this.description = task.description
    this.createdAt = task.createdAt.toISO()!
    this.updatedAt = task.updatedAt.toISO()!
    this.archived = task.archived
    this.deadline = task.deadline
    this.createdBy = task.createdBy
    this.listId = task.listId
  }
}
