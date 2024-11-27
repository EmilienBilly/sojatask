import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { inject } from '@adonisjs/core'
import GetActiveWorkspace from '#actions/workspaces/get_active_workspace'
import Workspace from '#models/workspace'
import { activeCookieName } from '#config/workspace'
import WorkspaceDto from '#dtos/workspace'

@inject()
export default class WorkspaceMiddleware {
  constructor(protected getActiveWorkspace: GetActiveWorkspace) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('web').user!
    try {
      ctx.workspaceId = ctx.request.cookie(activeCookieName)

      ctx.workspace = await this.getActiveWorkspace.handle()
    } catch (error) {
      console.log(error)
      ctx.session.reflash()
      return ctx.response.redirect().toRoute('workspaces.create')
    }

    const workspaces = await user.related('workspaces').query().preload('boards').orderBy('title')

    ctx.inertia.share({
      activeWorkspace: new WorkspaceDto(ctx.workspace),
      workspaces: WorkspaceDto.fromArray(workspaces),
    })
    return await next()
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    workspaceId?: number
    workspace: Workspace
  }
}
