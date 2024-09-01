import type { HttpContext } from '@adonisjs/core/http'
import { createBoardValidator } from '#validators/board_validator'
import Board from '#models/board'

export default class CreateBoardController {
  async handle({ request, session, response }: HttpContext) {
    const payload = await request.validateUsing(createBoardValidator)

    await Board.create({ ...payload })
    session.flash('success', 'Tableau créé')
    return response.redirect().back()
  }
}
