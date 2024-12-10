import vine from '@vinejs/vine'

export const createColumnValidator = vine.compile(
  vine.object({
    title: vine.string(),
    boardId: vine.number(),
  })
)
