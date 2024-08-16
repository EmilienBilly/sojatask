import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { createProjectValidator } from '#validators/project_validator'
import Project from '#models/project'
import { ProjectRepository } from '../../repositories/projects_repository.js'

@inject()
export default class ProjectsController {
  constructor(private repository: ProjectRepository) {}

  async getUserProjects({ auth }: HttpContext) {
    const projects = await this.repository.findAllProjectsByUserId(auth.user!.id)
    console.log(projects)
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('createProject')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const payload = await request.validateUsing(createProjectValidator)
    await Project.create({ ...payload, createdBy: auth.user!.id })
    session.flash('success', 'Projet créé')
    return response.redirect(`/create-project`)
  }
}
