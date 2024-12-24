import { taskOrderValidator } from '#validators/task_validator'
import { Infer } from '@vinejs/vine/types'
import Column from '#models/column'
import db from '@adonisjs/lucid/services/db'

type SortData = Infer<typeof taskOrderValidator>

type Params = {
  boardId: number
  data: SortData
}

type TaskFLatData = {
  id: number
  columnId: number
  order: number
}

export default class UpdateTaskOrder {
  static async handle({ boardId, data }: Params) {
    // Load all columns for the board along with their tasks
    const columns = await Column.query().where('boardId', boardId).preload('tasks') // Ensure the 'tasks' relationship is properly defined

    const tasksInDb = columns.flatMap((column) => column.tasks)

    // Prepare the new task data from the input
    const taskData = this.#flattenData(data)

    // Identify changes and apply necessary updates
    return db.transaction(async (trx) => {
      const updatePromises = taskData.map(({ id, columnId, order }) => {
        const taskInDb = tasksInDb.find((task) => task.id === id)

        if (!taskInDb) {
          throw new Error(`Task with ID ${id} not found`)
        }

        const hasChanged = taskInDb.columnId !== columnId || taskInDb.order !== order

        if (!hasChanged) {
          return null // No update required
        }

        // Update the task if needed
        taskInDb.useTransaction(trx)
        return taskInDb.merge({ columnId, order }).save()
      })

      // Execute all update promises
      return Promise.all(updatePromises.filter(Boolean))
    })
  }

  // Flatten the input data into a unified structure
  static #flattenData(data: SortData) {
    return data.columns.reduce<TaskFLatData[]>((result, column) => {
      const columnTasks = column.tasks.map((id, index) => ({
        id,
        columnId: column.id,
        order: index,
      }))

      return [...result, ...columnTasks]
    }, [])
  }
}
