import { BaseModelDto } from '@adocasts.com/dto/base'
import Task from '#models/task'

export default class TaskDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare createdAt: string
  declare updatedAt: string
  declare statusId: number
  declare createdBy: number
  declare assignedTo: number

  constructor(task?: Task) {
    super()

    if (!task) return
    this.id = task.id
    this.title = task.title
    this.description = task.description
    // this.createdAt = task.createdAt.toISO()!
    // this.updatedAt = task.updatedAt.toISO()!
    this.statusId = task.statusId
    this.createdBy = task.createdBy
    this.assignedTo = task.assignedTo
  }
}
