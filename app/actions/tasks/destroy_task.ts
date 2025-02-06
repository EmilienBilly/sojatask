import Task from '#models/task'

type Params = {
  id: number
}

export default class DestroyTask {
  static async handle({ id }: Params) {
    const task = await Task.findOrFail(id)

    await task.related('subtasks').query().delete()

    await task.delete()
  }
}
