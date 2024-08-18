import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ProjectRepository } from '../repositories/projects_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class ShareUserProjectsMiddleware {
  constructor(private repository: ProjectRepository) {}

  async handle({ inertia, auth }: HttpContext, next: NextFn) {
    const projects = await this.repository.findAllProjectsByUserId(auth.user!.id)
    inertia.share({ userProjects: projects })
    return await next()
  }
}
