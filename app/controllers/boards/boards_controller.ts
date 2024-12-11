import { HttpContext } from '@adonisjs/core/http'
import GetBoardWithColumnsAndTasks from '#actions/boards/get_board_with_columns_and_tasks'
import BoardDto from '#dtos/board'

export default class BoardsController {
  async show({ request, inertia }: HttpContext) {
    const boardId = request.param('boardId')

    const { board } = await GetBoardWithColumnsAndTasks.handle(boardId)

    return inertia.render('board', {
      board: new BoardDto(board),
    })
  }
}
