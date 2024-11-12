import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/login'
import { errors as authErrors } from '@adonisjs/auth'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

@inject()
export default class LoginController {
  constructor(private userService: UserService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async handle({ request, response, auth, session }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(username, password)
      const hasAtConsultProfile = await this.userService.hasAtConsultProfile(user.id)
      if (hasAtConsultProfile) {
        await auth.use('web').login(user)
        session.flash('success', 'Utilisateur connecté')
        return response.redirect().toPath('/')
      } else {
        session.flash(
          'error',
          "Vous n'avez pas les droits nécessaires pour accéder à cette application."
        )
        return response.redirect().back()
      }
    } catch (error) {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        session.flash('error', 'Identifiants incorrects')
      }
      return response.redirect().back()
    }
  }
}
