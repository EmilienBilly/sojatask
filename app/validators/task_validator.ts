import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string(),
    archived: vine.number().optional(),
    deadline: vine.number().optional(),
    columnId: vine.number(),
  })
)
