import type { HttpContext } from '@adonisjs/core/http'
import { createColumnValidator } from '#validators/list_validator'
import Column from '#models/column'

export default class CreateColumnController {
  async handle({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createColumnValidator)

    await Column.create({ ...payload })
    return response.redirect().back()
  }
}
