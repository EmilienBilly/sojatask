import { BaseModelDto } from '@adocasts.com/dto/base'
import Workspace from '#models/workspace'
import BoardDto from '#dtos/board'

export default class WorkspaceDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare createdBy: number
  declare boards: BoardDto[]

  constructor(workspace?: Workspace) {
    super()

    if (!workspace) return
    this.id = workspace.id
    this.title = workspace.title
    this.description = workspace.description
    this.createdBy = workspace.createdBy
    this.boards = BoardDto.fromArray(workspace.boards)
  }
}
