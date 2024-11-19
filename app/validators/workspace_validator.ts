import vine from '@vinejs/vine'

export const createWorkspaceValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
  })
)
