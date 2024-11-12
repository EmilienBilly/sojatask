import { BaseModelDto } from '@adocasts.com/dto/base'
import Workspace from '#models/workspace'

export default class WorkspaceDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare description: string
  declare createdBy: number

  constructor(workspace?: Workspace) {
    super()

    if (!workspace) return
    this.id = workspace.id
    this.name = workspace.name
    this.description = workspace.description
    this.createdBy = workspace.createdBy
  }
}
