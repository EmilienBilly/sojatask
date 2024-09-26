import type { HttpContext } from '@adonisjs/core/http'
import Board from '#models/board'
import List from '#models/list'
import Task from '#models/task'

//TODO : move DTOS into their own files

class BoardDto {
  constructor(private board: Board) {}

  toJson() {
    return {
      id: this.board.id,
      title: this.board.title,
      description: this.board.description,
      projectId: this.board.projectId,
      lists: this.board.lists.map((list: List) => new ListDto(list).toJson()),
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
      tasks: this.list.tasks.map((task: Task) => new TaskDTO(task).toJson()),
    }
  }
}

class TaskDTO {
  constructor(private task: Task) {}

  toJson() {
    return {
      id: this.task.id,
      name: this.task.name,
      description: this.task.description,
      archived: this.task.archived,
      deadline: this.task.deadline,
      createdBy: this.task.createdBy,
      listId: this.task.listId,
      createdAt: this.task.createdAt.toISO()!,
      updatedAt: this.task.updatedAt.toISO()!,
    }
  }
}

export default class BoardsController {
  async show({ request, inertia }: HttpContext) {
    const board = await Board.query()
      .where('id', request.param('boardId'))
      .preload('lists', (query) => {
        query.preload('tasks') // Précharge également les tâches associées
      })
      .firstOrFail()
    return inertia.render('board', {
      board: new BoardDto(board).toJson(),
    })
  }
}
