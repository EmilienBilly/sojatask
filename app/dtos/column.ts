import { BaseModelDto } from '@adocasts.com/dto/base'
import TaskDto from '#dtos/task'
import Column from '#models/column'

export default class ColumnDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare boardId: number
  declare tasks: TaskDto[]

  constructor(column?: Column) {
    super()

    if (!column) return
    this.id = column.id
    this.title = column.title
    this.boardId = column.boardId
    this.tasks = TaskDto.fromArray(column.tasks)
  }
}
