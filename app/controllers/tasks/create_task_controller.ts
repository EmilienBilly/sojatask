import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import { createTaskValidator } from '#validators/task_validator'

export default class CreateTaskController {
  async handle({ request, response, auth }: HttpContext) {
    console.log(request.all())
    const payload = await request.validateUsing(createTaskValidator)

    await Task.create({ ...payload, createdBy: auth.user!.id })
    return response.redirect().back()
  }
}
