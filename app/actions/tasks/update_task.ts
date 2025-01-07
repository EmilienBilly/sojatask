import { Infer } from '@vinejs/vine/types'
import { taskValidator } from '#validators/task_validator'
import Task from '#models/task'

type Params = {
  id: number
  data: Infer<typeof taskValidator>
}

export default class UpdateTask {
  static async handle({ id, data }: Params) {
    const task = await Task.query().where('id', id).firstOrFail()
    console.log(task)
    await task.merge(data).save()

    return task
  }
}
