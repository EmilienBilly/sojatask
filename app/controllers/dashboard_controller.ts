import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import TaskDto from '#dtos/task'

export default class DashboardController {
  async view({ inertia, auth }: HttpContext) {
    const tasks = await Task.query().where('createdBy', auth.user!.id)
    return inertia.render('dashboard', TaskDto.fromArray(tasks))
  }
}
