import type { HttpContext } from '@adonisjs/core/http'

export default class CreateProjectController {
  render({ inertia }: HttpContext) {
    return inertia.render('create_project')
  }
}
