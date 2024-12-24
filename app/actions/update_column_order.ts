import db from '@adonisjs/lucid/services/db'
import Board from '#models/board'

type Params = {
  boardId: number
  ids: number[]
}

export default class UpdateColumnOrder {
  static async handle({ boardId, ids }: Params) {
    const board = await Board.query().where('id', boardId).firstOrFail()
    let columns = await board.related('columns').query()

    await db.transaction(async (trx) => {
      for (const module of columns) {
        const order = ids.indexOf(module.id) + 1

        module.useTransaction(trx)

        await module.merge({ order }).save()
      }
    })

    columns = columns.sort((a, b) => a.order - b.order)

    return columns
  }
}
