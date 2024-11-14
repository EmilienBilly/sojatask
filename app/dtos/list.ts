import { BaseModelDto } from '@adocasts.com/dto/base'
import List from '#models/list'
import TaskDto from '#dtos/task'

export default class ListDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare boardId: number
  declare tasks: TaskDto[]

  constructor(list?: List) {
    super()

    if (!list) return
    this.id = list.id
    this.title = list.title
    this.boardId = list.boardId
    this.tasks = TaskDto.fromArray(list.tasks)
  }
}
