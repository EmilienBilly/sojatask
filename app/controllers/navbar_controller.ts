import type { HttpContext } from '@adonisjs/core/http'

export default class NavbarController {
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user
    return inertia.render('Navbar', {
      user: user ? { id: user.id, username: user.username } : null,
    })
  }
}
