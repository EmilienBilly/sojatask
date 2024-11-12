import { BaseModelDto } from '@adocasts.com/dto/base'
import Board from '#models/board'

export default class BoardDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare projectId: number

  constructor(board?: Board) {
    super()

    if (!board) return
    this.id = board.id
    this.title = board.title
    this.description = board.description
    this.projectId = board.projectId
  }
}
