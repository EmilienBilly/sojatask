import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Board extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare projectId: number
}
