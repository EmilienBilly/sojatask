import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

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

export default class DashboardController {
  async view({ inertia, auth }: HttpContext) {
    const tasks = await Task.query().where('createdBy', auth.user!.id)
    return inertia.render('dashboard', { tasks: tasks.map((task) => new TaskDTO(task).toJson()) })
  }
}
