import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Contact from '#models/contact'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Profile from '#models/profile'
import Workspace from '#models/workspace'

const AuthFinder = withAuthFinder(() => hash.use('cakephp'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static table = 'users'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare contactId: number

  @column()
  declare avatar: string

  @belongsTo(() => Contact)
  declare contact: BelongsTo<typeof Contact>

  @manyToMany(() => Profile, {
    pivotTable: 'profiles_users',
  })
  declare profiles: ManyToMany<typeof Profile>

  @manyToMany(() => Workspace, {
    pivotTable: 'task_workspace_users',
    pivotColumns: ['role_id'],
  })
  declare workspaces: ManyToMany<typeof Workspace>
}
