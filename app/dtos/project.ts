import { BaseModelDto } from '@adocasts.com/dto/base'
import Project from '#models/project'

export class ProjectDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare createdBy: number

  constructor(project?: Project | null) {
    super()

    if (!project) return
    this.id = project.id
    this.title = project.title
    this.description = project.description
    this.createdBy = project.createdBy
  }
}
