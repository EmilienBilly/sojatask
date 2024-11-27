import type { HttpContext } from '@adonisjs/core/http'
import { createBoardValidator } from '#validators/board'
import Board from '#models/board'

export default class CreateBoardController {
  render({ inertia }: HttpContext) {
    return inertia.render('createBoard')
  }

  async handle({ request, session, response }: HttpContext) {
    const payload = await request.validateUsing(createBoardValidator)

    await Board.create({ ...payload })
    session.flash('success', 'Tableau créé')
    /*TODO: redirect to the newly created board page*/
    return response.redirect().back()
  }
}
