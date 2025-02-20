import { BaseModelDto } from '@adocasts.com/dto/base'
import Workspace from '#models/workspace'
import BoardDto from '#dtos/board'
import UserDto from '#dtos/user'
export default class WorkspaceDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare createdBy: number
  declare boards: BoardDto[]
  declare users: UserDto[]

  constructor(workspace?: Workspace) {
    super()

    if (!workspace) return
    this.id = workspace.id
    this.title = workspace.title
    this.description = workspace.description
    this.createdBy = workspace.createdBy
    this.boards = BoardDto.fromArray(workspace.boards)
    this.users = UserDto.fromArray(workspace.users)
  }
}
