import type { HttpContext } from '@adonisjs/core/http'
import { createWorkspaceValidator } from '#validators/workspace_validator'
import Workspace from '#models/workspace'

export default class ProjectsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('createProject')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const user = auth.user!

    const payload = await request.validateUsing(createWorkspaceValidator)
    const workspace = await Workspace.create({ ...payload, createdBy: user.id })

    await user.related('workspaces').attach([workspace.id])
    session.flash('success', 'Projet créé')
    return response.redirect(`/create-project`)
  }
}
