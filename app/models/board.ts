import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Column from '#models/column'
import { compose } from '@adonisjs/core/helpers'
import { WithWorkspace } from './mixins/with_workspace.js'

export default class Board extends compose(BaseModel, WithWorkspace) {
  static table = 'task_boards'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @hasMany(() => Column)
  declare columns: HasMany<typeof Column>
}
