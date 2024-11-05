import type { HttpContext } from '@adonisjs/core/http'
import { createWorkspaceValidator } from '#validators/workspace_validator'
import Workspace from '#models/workspace'

export default class ProjectsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('createProject')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const payload = await request.validateUsing(createWorkspaceValidator)
    await Workspace.create({ ...payload, createdBy: auth.user!.id })
    session.flash('success', 'Projet créé')
    return response.redirect(`/create-project`)
  }
}
