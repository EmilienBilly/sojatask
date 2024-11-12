import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => User, {
    pivotTable: 'profiles_users',
  })
  declare users: ManyToMany<typeof User>
}
