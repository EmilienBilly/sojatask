import type { HttpContext } from '@adonisjs/core/http'
import Board from '#models/board'
import List from '#models/list'

class BoardDto {
  constructor(private board: Board) {}

  toJson() {
    return {
      id: this.board.id,
      title: this.board.title,
      description: this.board.description,
      projectId: this.board.projectId,
    }
  }
}

class ListDto {
  constructor(private list: List) {}

  toJson() {
    return {
      id: this.list.id,
      title: this.list.title,
      boardId: this.list.boardId,
      tasks: this.list.tasks,
    }
  }
}

export default class BoardsController {
  async show({ request, inertia }: HttpContext) {
    const board = await Board.findByOrFail('id', request.param('boardId'))
    const lists = await board.related('lists').query().preload('tasks')
    return inertia.render('board', {
      board: new BoardDto(board).toJson(),
      lists: lists.map((list) => new ListDto(list).toJson()),
    })
  }
}
