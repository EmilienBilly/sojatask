import type { HttpContext } from '@adonisjs/core/http'
import { ProjectRepository } from '../../repositories/projects_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UserProjectsController {
  constructor(private repository: ProjectRepository) {}

  index({ auth }: HttpContext) {
    return this.repository.findAllProjectsByUserId(auth.user!.id)
  }

  async show({ request, inertia }: HttpContext) {
    const project = await this.repository.findById(request.param('id'))
    return inertia.render('userProject', { project })
  }
}
