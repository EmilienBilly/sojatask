import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import SetActiveWorkspace from './set_active_workspace.js'

@inject()
export default class GetActiveWorkspace {
  constructor(
    protected ctx: HttpContext,
    protected setActiveWorkspace: SetActiveWorkspace
  ) {}

  async handle() {
    const activeId = this.ctx.workspaceId
    let workspace = await this.#query()
      .if(activeId, (query) => query.where('task_workspaces.id', activeId!))
      .first()

    if (!workspace) {
      workspace = await this.#query().firstOrFail()
    }

    if (!activeId || workspace.id !== activeId) {
      await this.setActiveWorkspace.handle({ id: workspace.id })
    }

    return workspace
  }

  #query() {
    return this.ctx.auth.use('web').user!.related('workspaces').query()
  }
}
