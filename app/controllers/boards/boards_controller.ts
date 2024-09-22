import type { HttpContext } from '@adonisjs/core/http'
import Board from '#models/board'

export default class BoardsController {
  async show({ request, inertia }: HttpContext) {
    console.log('called twice')
    const boardData = await Board.findBy('id', request.param('boardId'))
    await boardData?.load('lists')
    const board = boardData?.serialize() as {
      id: number
      title: string
      description: string
      projectId: number
    }
    return inertia.render('board', { board, lists: boardData?.lists })
  }
}
