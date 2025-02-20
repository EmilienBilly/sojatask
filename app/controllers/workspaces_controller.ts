import type { HttpContext } from '@adonisjs/core/http'
import { createWorkspaceValidator } from '#validators/workspace_validator'
import SetActiveWorkspace from '#actions/workspaces/set_active_workspace'
import { inject } from '@adonisjs/core'
import StoreWorkspace from '#actions/workspaces/store_workspace'
import GetWorkspaceUsers from '#actions/workspaces/get_workspace_users'
import UserDto from '#dtos/user'
import GetRoles from '#actions/roles/get_roles'
import RoleDto from '#dtos/role'

@inject()
export default class WorkspacesController {
  constructor(protected setActiveWorkspace: SetActiveWorkspace) {}

  async show({ inertia, workspace }: HttpContext) {
    return inertia.render('workspace', {
      users: async () => {
        const users = await GetWorkspaceUsers.handle({
          workspace,
        })
        return UserDto.fromArray(users)
      },
      roles: async () => {
        const roles = await GetRoles.handle()
        return RoleDto.fromArray(roles)
      },
    })
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
