import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

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

export const taskValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string().optional(),
    dueDate: vine
      .date()
      .nullable()
      .optional()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),
  })
)
