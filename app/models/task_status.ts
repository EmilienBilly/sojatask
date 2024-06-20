import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TaskStatus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string
}
