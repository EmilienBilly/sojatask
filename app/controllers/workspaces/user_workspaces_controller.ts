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
    // TODO : Change userProject component name
    return inertia.render('userProject', {
      project: new WorkspaceDto(workspace),
      boards: workspace?.boards,
    })
  }
}
