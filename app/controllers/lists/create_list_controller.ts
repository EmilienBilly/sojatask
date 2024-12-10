import type { HttpContext } from '@adonisjs/core/http'
import { createListValidator } from '#validators/list_validator'
import List from '#models/column'

export default class CreateListController {
  async handle({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createListValidator)

    await List.create({ ...payload })
    return response.redirect().back()
  }
}
