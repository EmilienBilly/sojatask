import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    createdBy: vine.number(),
  })
)
