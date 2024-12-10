import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

export default class TasksController {
  async update({ request, params, response }: HttpContext) {
    const taskId = params.id
    const { newListId } = request.only(['newListId'])

    const task = await Task.findOrFail(taskId)
    task.columnId = newListId
    await task.save()

    return response.redirect().back()
  }
}
