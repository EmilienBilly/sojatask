import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user)

    response.redirect('/inertia')
  }
}
