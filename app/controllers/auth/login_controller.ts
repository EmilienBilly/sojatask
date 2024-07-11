import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/login'

export default class LoginController {
  render({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user)
    session.flash('success', 'Utilisateur connecté')
    return response.redirect().toPath('/')
  }
}
