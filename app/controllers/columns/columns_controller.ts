import type { HttpContext } from '@adonisjs/core/http'
import UpdateColumnOrder from '#actions/update_column_order'
import { columneOrderValidator } from '#validators/column_validator'

export default class ColumnController {
  async order({ params, request, response }: HttpContext) {
    const { ids } = await request.validateUsing(columneOrderValidator)

    await UpdateColumnOrder.handle({
      boardId: params.boardId,
      ids,
    })

    return response.redirect().back()
  }
}
