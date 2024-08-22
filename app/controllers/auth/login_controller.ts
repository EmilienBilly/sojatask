import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/login'
import { errors as authErrors } from '@adonisjs/auth'

export default class LoginController {
  render({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async handle({ request, response, auth, session }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)
      session.flash('success', 'Utilisateur connecté')
      return response.redirect().toPath('/')
    } catch (error) {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        session.flash('error', 'Identifiants incorrects')
      }
      return response.redirect().back()
    }
  }
}
