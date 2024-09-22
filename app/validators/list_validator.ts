import vine from '@vinejs/vine'

export const createListValidator = vine.compile(
  vine.object({
    title: vine.string(),
    boardId: vine.number(),
  })
)
