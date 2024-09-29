import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    name: vine.string(),
    archived: vine.number().optional(),
    deadline: vine.number().optional(),
    listId: vine.number(),
  })
)
