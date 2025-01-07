import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import { createTaskValidator } from '#validators/task_validator'

export default class CreateTaskController {
  async handle({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createTaskValidator)

    try {
      await Task.create({ ...payload, createdBy: auth.user!.id })
    } catch (e) {
      console.log(e)
    }
    return response.redirect().back()
  }
}
