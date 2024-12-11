import type { HttpContext } from '@adonisjs/core/http'
import Column from '#models/column'

export default class ColumnController {
  /*TODO: utiliser une action pour rendre le code plus props*/
  async reorder({ request, response }: HttpContext) {
    const { activeColumnId, overColumnId } = request.only(['activeColumnId', 'overColumnId'])

    const activeColumn = await Column.findOrFail(activeColumnId)
    const overColumn = await Column.findOrFail(overColumnId)

    const tempOrder = activeColumn.order
    activeColumn.order = overColumn.order
    overColumn.order = tempOrder

    await activeColumn.save()
    await overColumn.save()

    return response.redirect().back()
  }
}
