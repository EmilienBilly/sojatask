import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { activeCookieName } from '#config/workspace'

type Params = {
  id: number
}

@inject()
export default class SetActiveWorkspace {
  constructor(protected ctx: HttpContext) {}

  async handle({ id }: Params) {
    this.ctx.workspaceId = id
    this.ctx.response.cookie(activeCookieName, id)
  }
}
