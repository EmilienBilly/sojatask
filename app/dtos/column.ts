import { BaseModelDto } from '@adocasts.com/dto/base'
import TaskDto from '#dtos/task'
import Column from '#models/column'
import WorkspaceDto from '#dtos/workspace'

export default class ColumnDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare boardId: number
  declare workspaceId: number
  declare tasks: TaskDto[]
  declare workspace: WorkspaceDto | null

  constructor(column?: Column) {
    super()

    if (!column) return
    this.id = column.id
    this.title = column.title
    this.boardId = column.boardId
    this.workspaceId = column.workspaceId
    this.tasks = TaskDto.fromArray(column.tasks)
    this.workspace = column.workspace && new WorkspaceDto(column.workspace)
  }
}
