import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { ProjectDto } from '#dtos/project'

export default class UserProjectsController {
  async index({ auth }: HttpContext) {
    const projects = await Project.findManyBy('createdBy', auth.user!.id)
    return ProjectDto.fromArray(projects)
  }

  async show({ request, inertia }: HttpContext) {
    const project = await Project.findBy('id', request.param('id'))
    return inertia.render('userProject', { project: new ProjectDto(project) })
  }
}
