import { BaseModelDto } from '@adocasts.com/dto/base'
import Task from '#models/task'
import WorkspaceDto from '#dtos/workspace'

export default class TaskDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string | null
  declare createdAt: string
  declare updatedAt: string
  declare archived: number
  declare dueDate: string | null
  declare startDate: string | null
  declare createdBy: number
  declare columnId: number
  declare order: number
  declare parentId: number | null
  declare subtasks: TaskDto[]
  declare completed: boolean
  declare completedAt: string | null
  declare workspaceId: number
  declare workspace: WorkspaceDto | null

  constructor(task?: Task) {
    super()

    if (!task) return
    this.id = task.id
    this.title = task.title
    this.description = task.description ?? null
    this.createdAt = task.createdAt.toISO()!
    this.updatedAt = task.updatedAt.toISO()!
    this.archived = task.archived
    this.dueDate = task.dueDate?.toISO() ?? null
    this.startDate = task.startDate?.toISO() ?? null
    this.createdBy = task.createdBy
    this.columnId = task.columnId
    this.order = task.order
    this.parentId = task.parentId ?? null
    this.subtasks = TaskDto.fromArray(task.subtasks)
    this.completed = task.completed === 1
    this.completedAt = task.completedAt?.toISO() ?? null
    this.workspaceId = task.workspaceId
    this.workspace = task.workspace && new WorkspaceDto(task.workspace)
  }
}
