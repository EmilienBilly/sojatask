import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProjectColumn extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare projectId: number
}
