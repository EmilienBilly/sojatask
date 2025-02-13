import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import Workspace from '#models/workspace'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export const WithWorkspace = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  class MixinClass extends superclass {
    @column()
    declare workspaceId: number

    @belongsTo(() => Workspace)
    declare workspace: BelongsTo<typeof Workspace>
  }

  return MixinClass
}
