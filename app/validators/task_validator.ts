import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string(),
    archived: vine.number().optional(),
    deadline: vine.number().optional(),
    columnId: vine.number(),
  })
)

export const taskOrderValidator = vine.compile(
  vine.object({
    columns: vine.array(
      vine.object({
        id: vine.number(),
        tasks: vine.array(vine.number()),
      })
    ),
  })
)
