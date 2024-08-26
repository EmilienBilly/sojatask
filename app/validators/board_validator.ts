import vine from '@vinejs/vine'

export const createBoardValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    projectId: vine.number(),
  })
)
