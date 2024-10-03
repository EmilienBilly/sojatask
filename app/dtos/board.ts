// Dtos/BoardDto.ts
import List from '#models/list'
import ListDto from '#dtos/list'
import Board from '#models/board'

export default class BoardDto {
  constructor(private board: Board) {}

  toJson() {
    return {
      id: this.board.id,
      title: this.board.title,
      description: this.board.description,
      projectId: this.board.projectId,
      lists: this.board.lists.map((list: List) => new ListDto(list).toJson()),
    }
  }
}
