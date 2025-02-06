import Board from '#models/board'

export default class GetBoardWithColumnsAndTasks {
  static async handle(id: number) {
    const board = await Board.query()
      .where('id', id)
      .preload('columns', (query) => {
        query.orderBy('order', 'asc')
        query.preload('tasks', (queryTasks) => {
          queryTasks.whereNull('parent_id')
          queryTasks.orderBy('order', 'asc')
          queryTasks.preload('subtasks', (querySubtasks) => {
            querySubtasks.orderBy('order', 'asc')
          })
        })
      })
      .firstOrFail()

    return { board }
  }
}
