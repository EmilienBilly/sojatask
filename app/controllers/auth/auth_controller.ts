import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async login({ request }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    const user = await User.verifyCredentials(username, password)

    //TODO : look up how to use the session guard to login the user (guard.login)
  }
}
