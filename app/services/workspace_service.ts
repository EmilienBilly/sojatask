import { HttpContext } from '@adonisjs/core/http'
import Workspace from '~/app/models/workspace.js'
import WorkspaceDto from '~/app/dtos/workspace.js'

export default class WorkspaceService {
  async setActiveWorkspace({ ctx }: HttpContext, id: number) {
    ctx.workspaceId = id
    ctx.response.cookie('active_workspace', id)
  }

  async getActiveWorkspace({ workspaceId }: HttpContext) {
    const activeId = workspaceId

    let workspace = await this.getWorkspaceById(activeId)
    if (workspace.id !== activeId) {
      this.setActiveWorkspace(workspace.id)
    }
  }

  async getUserWorkspaces({ auth }: HttpContext) {
    const workspaces = await Workspace.findManyBy('createdBy', auth.use('web').user!.id)
    return WorkspaceDto.fromArray(workspaces)
  }

  async getWorkspaceById(id: number) {
    const workspace = await Workspace.findByOrFail('id', id)
    return new WorkspaceDto(workspace)
  }
}
