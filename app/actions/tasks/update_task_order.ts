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
    const column = await Column.query().where('boardId', boardId).firstOrFail()
    const tasks = await column.related('tasks').query().select('id', 'columnId', 'order')
    const taskData = this.#flattenData(data)

    return db.transaction(async (trx) => {
      const promises = taskData.map(({ id, columnId: colId, order }) => {
        const task = tasks.find((item) => item.id === id)
        const isSame = task?.order === order && task?.columnId === colId

        if (!task || isSame) {
          return
        }

        task.useTransaction(trx)

        return task.merge({ columnId: colId, order }).save()
      })

      return Promise.all(promises)
    })
  }

  static #flattenData(data: SortData) {
    return data.columns.reduce<TaskFLatData[]>((tasks, column) => {
      const columnTasks = column.tasks.map((id, index) => ({
        id,
        columnId: column.id,
        order: index,
      }))

      return [...tasks, ...columnTasks]
    }, [])
  }
}
