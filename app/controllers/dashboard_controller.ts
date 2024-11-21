import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import TaskDto from '#dtos/task'
import WorkspaceDto from '#dtos/workspace'

export default class DashboardController {
  async view({ inertia, auth }: HttpContext) {
    const tasks = await Task.query().where('createdBy', auth.user!.id)
    const workspaces = await auth.use('web').user!.related('workspaces').query()
    console.log(WorkspaceDto.fromArray(workspaces))
    return inertia.render('dashboard', TaskDto.fromArray(tasks))
  }
}
