import { BaseModelDto } from '@adocasts.com/dto/base'
import Project from '#models/project'

export class ProjectDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare description: string
  declare createdBy: number

  constructor(project?: Project | null) {
    super()

    if (!project) return
    this.id = project.id
    this.name = project.name
    this.description = project.description
    this.createdBy = project.createdBy
  }
}
