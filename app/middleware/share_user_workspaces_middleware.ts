import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Workspace from '#models/workspace'
import WorkspaceDto from '#dtos/workspace'

export default class ShareUserWorkspacesMiddleware {
  async handle({ inertia, auth }: HttpContext, next: NextFn) {
    const workspaces = await Workspace.findManyBy('createdBy', auth.user!.id)
    const userWorkspaces = WorkspaceDto.fromArray(workspaces)
    inertia.share({ userWorkspaces })
    return await next()
  }
}
