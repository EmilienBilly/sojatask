import { Infer } from '@vinejs/vine/types'
import { createSubtaskValidator } from '#validators/task_validator'
import Task from '#models/task'

type Params = {
  parentId: number
  data: Infer<typeof createSubtaskValidator>
}

export default class CreateSubtask {
  static async handle({ parentId, data }: Params) {
    const parentTask = await Task.query().where('id', parentId).firstOrFail()

    return parentTask.related('subtasks').create({ ...data, columnId: parentTask.columnId })
  }
}
