import type { HttpContext } from '@adonisjs/core/http'
import { ProjectRepository } from '../../repositories/projects_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UserProjectsController {
  constructor(private repository: ProjectRepository) {}

  async index({ auth }: HttpContext) {
    const projects = await this.repository.findAllProjectsByUserId(auth.user!.id)
    console.log(projects)
  }

  async show({ params }: HttpContext) {
    const project = await this.repository.findById(params.id)
    console.log(project)
  }
}
