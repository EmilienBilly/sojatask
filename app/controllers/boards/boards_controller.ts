import { HttpContext } from '@adonisjs/core/http'
import GetBoardWithColumnsAndTasks from '#actions/boards/get_board_with_columns_and_tasks'
import BoardDto from '#dtos/board'
import TaskDto from '#dtos/task'
import GetTaskWithSubtasks from '#actions/tasks/get_task_with_subtasks'

export default class BoardsController {
  async show({ request, inertia }: HttpContext) {
    const boardId = request.param('boardId')
    const taskId = request.param('taskId')

    return inertia.render('board', {
      board: await (async () => {
        const { board } = await GetBoardWithColumnsAndTasks.handle(boardId)
        return new BoardDto(board)
      })(),
      task: await (async () => {
        if (taskId) {
          const { task } = await GetTaskWithSubtasks.handle(taskId)
          return new TaskDto(task)
        }
      })(),
    })
  }
}
