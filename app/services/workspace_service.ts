import { HttpContext } from '@adonisjs/core/http'
import Workspace from '#models/workspace'
import WorkspaceDto from '#dtos/workspace'

export default class WorkspaceService {
  constructor(protected ctx: HttpContext) {}

  async setActiveWorkspace({ workspaceId, response }: HttpContext, id: number) {
    workspaceId = id
    response.cookie('active_workspace', id)
  }

  async getActiveWorkspace() {
    const activeId = this.ctx.workspaceId

    if (activeId) {
      const workspace = await this.getWorkspaceById(activeId)
    } else {
    }
    if (workspace.id !== activeId) {
      this.setActiveWorkspace(workspace.id)
    }
  }

  async getAuthenticatedUserWorkspaces() {
    const user = this.ctx.auth.user!
    const workspaces = await user.related('workspaces').query()
    return WorkspaceDto.fromArray(workspaces)
  }

  async getWorkspaceById(id?: number) {
    const workspace = await Workspace.findByOrFail('id', id)
    return new WorkspaceDto(workspace)
  }
}
