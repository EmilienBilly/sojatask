import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Project from '#models/project'
import { ProjectDto } from '#dtos/project'

export default class ShareUserProjectsMiddleware {
  async handle({ inertia, auth }: HttpContext, next: NextFn) {
    const projects = await Project.findManyBy('createdBy', auth.user!.id)
    const userProjects = ProjectDto.fromArray(projects)
    inertia.share({ userProjects })
    return await next()
  }
}
