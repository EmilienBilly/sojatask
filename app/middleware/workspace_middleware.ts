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
    const user = ctx.auth.use('web').user

    // Vérifier si l'utilisateur est connecté
    if (!user) {
      // Évitez la redirection en boucle vers login
      if (ctx.route?.name === 'login') {
        return await next()
      }
      return ctx.response.redirect().toRoute('login')
    }

    // Exclure la logique si déjà sur la page de création de workspace
    if (ctx.route?.name === 'workspaces.create') {
      return await next()
    }

    try {
      ctx.workspaceId = ctx.request.cookie(activeCookieName)

      // Obtenir le workspace actif
      const workspace = await this.getActiveWorkspace.handle()

      // Si aucun workspace n'existe, rediriger vers la page de création
      if (!workspace) {
        return ctx.response.redirect().toRoute('workspaces.create')
      }

      ctx.workspace = workspace
    } catch (error) {
      console.error(error)
      ctx.session.reflash()
      return ctx.response.redirect().toRoute('workspaces.create')
    }

    // Charger tous les workspaces de l'utilisateur
    const workspaces = await user.related('workspaces').query().preload('boards').orderBy('title')

    // Partager les workspaces via Inertia
    ctx.inertia.share({
      activeWorkspace: new WorkspaceDto(ctx.workspace),
      workspaces: WorkspaceDto.fromArray(workspaces),
    })

    return await next()
  }
}

// Étendre le HttpContext pour inclure workspaceId et workspace
declare module '@adonisjs/core/http' {
  export interface HttpContext {
    workspaceId?: number
    workspace: Workspace
  }
}
