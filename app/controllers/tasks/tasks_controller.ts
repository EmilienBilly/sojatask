import type { HttpContext } from '@adonisjs/core/http'
import { taskOrderValidator, taskValidator } from '#validators/task_validator'
import UpdateTaskOrder from '#actions/tasks/update_task_order'
import UpdateTask from '#actions/tasks/update_task'

export default class TaskController {
  async order({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(taskOrderValidator)

    await UpdateTaskOrder.handle({
      boardId: params.boardId,
      data,
    })
    return response.redirect().back()
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(taskValidator)
    await UpdateTask.handle({
      id: params.id,
      data,
    })

    return response.redirect().back()
  }
}
