import vine from '@vinejs/vine'

export const createColumnValidator = vine.compile(
  vine.object({
    title: vine.string(),
    boardId: vine.number(),
  })
)

export const columneOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()),
  })
)
