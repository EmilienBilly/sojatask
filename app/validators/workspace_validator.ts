import vine from '@vinejs/vine'
import { WorkspaceMetaData } from './helpers/workspaces.js'

export const createWorkspaceValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
  })
)

export const emailRule = vine.string().maxLength(255).email().normalizeEmail()

export const workspaceInviteValidator = vine.withMetaData<WorkspaceMetaData>().compile(
  vine.object({
    email: emailRule.clone().unique(async (db, value, field) => {
      const exists = await db
        .from('users')
        .where('email', value)
        .where('organization_id', field.meta.workspaceId)
        .first()

      return !exists
    }),
    role: vine.number().exists(async (db, value) => {
      const exists = await db.from('roles').where('id', value).select('id').first()

      return !!exists
    }),
  })
)
