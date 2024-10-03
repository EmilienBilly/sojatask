import Board from '#models/board'
import BoardDto from '#dtos/board'

export default class BoardService {
  async getBoardWithListsAndTasks(boardId: number) {
    const board = await Board.query()
      .where('id', boardId)
      .preload('lists', (query) => {
        query.preload('tasks')
      })
      .firstOrFail()

    return new BoardDto(board).toJson()
  }
}
