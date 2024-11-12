import { BaseModelDto } from '@adocasts.com/dto/base'
import List from '#models/list'

export default class ListDto extends BaseModelDto {
  declare id: number
  declare title: string
  declare boardId: number

  constructor(list?: List) {
    super()

    if (!list) return
    this.id = list.id
    this.title = list.title
    this.boardId = list.boardId
  }
}
