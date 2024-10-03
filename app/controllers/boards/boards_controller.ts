import { inject } from '@adonisjs/core'
import BoardService from '#services/board_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BoardsController {
  constructor(private boardService: BoardService) {}

  async show({ request, inertia }: HttpContext) {
    const boardId = request.param('boardId')
    const boardData = await this.boardService.getBoardWithListsAndTasks(boardId)

    return inertia.render('board', {
      board: boardData,
    })
  }
}
