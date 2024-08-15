import type { HttpContext } from '@adonisjs/core/http'

export default class CreateProjectController {
  view({ inertia }: HttpContext) {
    return inertia.render('createProject')
  }
}
