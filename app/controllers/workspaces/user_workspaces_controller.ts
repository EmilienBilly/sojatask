import type { HttpContext } from '@adonisjs/core/http'
import Workspace from '#models/workspace'
import { WorkspaceDto } from '#dtos/workspace'

export default class UserProjectsController {
  async index({ auth }: HttpContext) {
    const workspaces = await Workspace.findManyBy('createdBy', auth.user!.id)
    return WorkspaceDto.fromArray(workspaces)
  }

  async show({ request, inertia }: HttpContext) {
    const workspace = await Workspace.findBy('id', request.param('id'))
    await workspace?.load('boards')
    return inertia.render('userWorkspaces', {
      project: new WorkspaceDto(workspace),
      boards: workspace?.boards,
    })
  }
}
