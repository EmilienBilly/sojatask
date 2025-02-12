import Roles from '#enums/roles'
import User from '#models/user'
import Workspace from '#models/workspace'

import { createWorkspaceValidator } from '#validators/workspace_validator'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type Params = {
  user: User
  data: Infer<typeof createWorkspaceValidator>
}

export default class StoreWorkspace {
  static async handle({ user, data }: Params) {
    return db.transaction(async (trx) => {
      // 1. create our organization
      const organization = await Workspace.create({ ...data, createdBy: user.id }, { client: trx })

      // 2. make this user the admin
      const rolePromise = this.#assignAdmin(organization, user)

      await Promise.all([rolePromise])

      return organization
    })
  }

  static async #assignAdmin(workspace: Workspace, user: User) {
    return workspace.related('users').attach({
      [user.id]: {
        role_id: Roles.ADMIN,
      },
    })
  }
}
