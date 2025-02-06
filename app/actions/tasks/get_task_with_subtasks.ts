import Task from '#models/task'

export default class GetTaskWithSubtasks {
  static async handle(id: number) {
    const task = await Task.query().where('id', id).preload('subtasks').firstOrFail()

    return { task }
  }
}
