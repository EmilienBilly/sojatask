import type { HttpContext } from '@adonisjs/core/http'
import { createWorkspaceValidator } from '#validators/workspace_validator'
import Workspace from '#models/workspace'
import SetActiveWorkspace from '#actions/workspaces/set_active_workspace'
import { inject } from '@adonisjs/core'

@inject()
export default class ProjectsController {
  constructor(protected setActiveWorkspace: SetActiveWorkspace) {}

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

  async active({ params, response }: HttpContext) {
    await this.setActiveWorkspace.handle({ id: params.id })
    return response.redirect().toPath('/')
  }
}
