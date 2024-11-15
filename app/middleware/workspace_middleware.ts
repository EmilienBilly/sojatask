import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { inject } from '@adonisjs/core'
import WorkspaceService from '~/app/services/workspace_service.js'
import Workspace from '~/app/models/workspace.js'

@inject()
export default class WorkspaceMiddleware {
  constructor(protected workspaceService: WorkspaceService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    try {
      ctx.workspaceId = ctx.request.cookie('active_workspace')

      const workspace = await this.workspaceService.getActiveWorkspace(ctx.workspaceId)
      ctx.workspace = workspace
    } catch (e) {
      console.log(e)
      ctx.session.reflash()
    }
    const output = await next()
    return output
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    workspaceId?: number
    workspace: Workspace
  }
}
