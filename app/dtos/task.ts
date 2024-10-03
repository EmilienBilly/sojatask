import Task from '#models/task'

export default class TaskDTO {
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
