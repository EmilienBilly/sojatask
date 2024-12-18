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
        // Handle case where task is placed between two others in the same column
        const allTasks = await Task.query().where('columnId', activeColumnId).orderBy('order')

        const overTaskIndex = allTasks.findIndex((task) => task.id === overTaskId)
        const activeTaskIndex = allTasks.findIndex((task) => task.id === activeTaskId)

        // Remove the active task from the list and insert it at the new position
        allTasks.splice(activeTaskIndex, 1)
        allTasks.splice(overTaskIndex + 1, 0, activeTask)

        // Reassign order values to tasks in the updated list
        for (const [i, allTask] of allTasks.entries()) {
          allTask.order = i + 1
          await allTask.save()
        }
      } else {
        activeTask.columnId = overColumnId
        activeTask.order = overTask.order + 0.5

        // Ensure no duplicate orders in the destination column
        const tasksInDestinationColumn = await Task.query()
          .where('columnId', overColumnId)
          .orderBy('order')

        tasksInDestinationColumn.push(activeTask)
        tasksInDestinationColumn.sort((a, b) => a.order - b.order)

        // Reassign order values to tasks in the destination column
        for (const [i, element] of tasksInDestinationColumn.entries()) {
          element.order = i + 1
          await element.save()
        }
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
