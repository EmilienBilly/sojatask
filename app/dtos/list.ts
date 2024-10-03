import List from '#models/list'
import Task from '#models/task'
import TaskDTO from '#dtos/task'

export default class ListDto {
  constructor(private list: List) {}

  toJson() {
    return {
      id: this.list.id,
      title: this.list.title,
      boardId: this.list.boardId,
      tasks: this.list.tasks.map((task: Task) => new TaskDTO(task).toJson()),
    }
  }
}
