import factory from '@adonisjs/lucid/factories'
import Task from '#models/task'

export const TaskFactory = factory
  .define(Task, async ({ faker }) => {
    return {
      title: faker.word.words(3),
      description: faker.lorem.lines({ min: 1, max: 3 }),
      statusId: 1,
      createdBy: 1,
      assignedTo: undefined,
      columnId: undefined,
    }
  })
  .build()
