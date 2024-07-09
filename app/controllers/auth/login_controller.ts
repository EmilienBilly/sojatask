import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class LoginController {
  static validator = vine.compile(
    vine.object({
      username: vine.string().email(),
      password: vine.string(),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async login({ request, auth, response }: HttpContext) {
    const { username, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
