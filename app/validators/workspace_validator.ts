import vine from '@vinejs/vine'

export const createWorkspaceValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string(),
  })
)
