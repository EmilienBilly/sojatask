import { BaseModelDto } from '@adocasts.com/dto/base'
import Board from '#models/board'
import ListDto from '#dtos/list'

export default class BoardDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare projectId: number
  declare lists: ListDto[]

  constructor(board?: Board) {
    super()

    if (!board) return
    this.id = board.id
    this.title = board.title
    this.description = board.description
    this.projectId = board.projectId
    this.lists = ListDto.fromArray(board.lists)
  }
}
