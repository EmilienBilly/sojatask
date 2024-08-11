import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
  render({ inertia }: HttpContext) {
    return inertia.render('login')
  }
}
