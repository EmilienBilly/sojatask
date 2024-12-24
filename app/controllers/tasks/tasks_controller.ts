import type { HttpContext } from '@adonisjs/core/http'
import { taskOrderValidator } from '#validators/task_validator'
import UpdateTaskOrder from '#actions/tasks/update_task_order'

export default class TaskController {
  async order({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(taskOrderValidator)

    await UpdateTaskOrder.handle({
      boardId: params.boardId,
      data,
    })
    console.log('Data', data)
    return response.redirect().back()
  }
}
