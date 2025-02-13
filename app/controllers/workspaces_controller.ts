import type { HttpContext } from '@adonisjs/core/http'
import { createWorkspaceValidator } from '#validators/workspace_validator'
import SetActiveWorkspace from '#actions/workspaces/set_active_workspace'
import { inject } from '@adonisjs/core'
import StoreWorkspace from '#actions/workspaces/store_workspace'

@inject()
export default class WorkspacesController {
  constructor(protected setActiveWorkspace: SetActiveWorkspace) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('workspace')
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('createWorkspace')
  }

  async store({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(createWorkspaceValidator)
    const workspace = await StoreWorkspace.handle({
      user: auth.use('web').user!,
      data,
    })

    this.setActiveWorkspace.handle({ id: workspace.id })

    return response.redirect(`/`)
  }

  async active({ params, response }: HttpContext) {
    await this.setActiveWorkspace.handle({ id: params.id })
    return response.redirect().toPath('/')
  }
}
