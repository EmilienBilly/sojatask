import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  view({ inertia }: HttpContext) {
    return inertia.render('logout')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toPath('/logout')
  }
}
