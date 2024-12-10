import { BaseModelDto } from '@adocasts.com/dto/base'
import Board from '#models/board'
import ColumnDto from '#dtos/column'

export default class BoardDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare description: string
  declare workspaceId: number
  declare columns: ColumnDto[]

  constructor(board?: Board) {
    super()

    if (!board) return
    this.id = board.id
    this.title = board.title
    this.description = board.description
    this.workspaceId = board.workspaceId
    this.columns = ColumnDto.fromArray(board.columns)
  }
}
