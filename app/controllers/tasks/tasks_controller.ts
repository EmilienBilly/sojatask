import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

export default class TaskController {
  async reorder({ request, response }: HttpContext) {
    const { activeTaskId, overTaskId, activeColumnId, overColumnId } = request.only([
      'activeTaskId',
      'overTaskId',
      'activeColumnId',
      'overColumnId',
    ])

    const activeTask = await Task.findOrFail(activeTaskId)

    if (overTaskId) {
      const overTask = await Task.findOrFail(overTaskId)

      if (activeColumnId === overColumnId) {
        const tempOrder = activeTask.order
        activeTask.order = overTask.order
        overTask.order = tempOrder

        await activeTask.save()
        await overTask.save()
      } else {
        activeTask.columnId = overColumnId
        activeTask.order = overTask.order

        await activeTask.save()
      }
    } else {
      // Handling case when moving to an empty column
      activeTask.columnId = overColumnId
      const maxOrder = await Task.query().where('columnId', overColumnId).max('order as order')
      activeTask.order = (maxOrder[0]?.order || 0) + 1

      await activeTask.save()
    }

    return response.redirect().back()
  }
}
