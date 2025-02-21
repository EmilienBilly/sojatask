import { Database } from '@adonisjs/lucid/database'
import { FieldContext } from '@vinejs/vine/types'

export type WorkspaceMetaData = {
  workspaceId: number
}

export function withWorkspaceMetaData(id: number) {
  return {
    meta: {
      workspaceId: id,
    },
  }
}

export function existsInWorkspace(table: string, column: string = 'id') {
  return async (db: Database, value: string | number, field: FieldContext) => {
    const result = await db
      .from(table)
      .select(column)
      .where(column, value)
      .where('organization_id', field.meta.workspaceId)
      .first()

    return !!result
  }
}
