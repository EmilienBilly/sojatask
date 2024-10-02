import factory from '@adonisjs/lucid/factories'
import Task from '#models/task'

export const TaskFactory = factory
  .define(Task, async ({ faker }) => {
    return {
      name: faker.word.words(3),
      description: faker.lorem.lines({ min: 1, max: 3 }),
      archived: 0,
      createdBy: 1,
      listId: undefined,
      deadline: 1,
    }
  })
  .build()
