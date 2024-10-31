import { BaseModelDto } from '@adocasts.com/dto/base'
import Workspace from '#models/workspace'

export class WorkspaceDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare description: string
  declare createdBy: number

  constructor(project?: Workspace | null) {
    super()

    if (!project) return
    this.id = project.id
    this.name = project.name
    this.description = project.description
    this.createdBy = project.createdBy
  }
}
