import factory from '@adonisjs/lucid/factories'
import Board from '#models/board'

export const BoardFactory = factory
  .define(Board, async ({ faker }) => {
    return {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      projectId: faker.number.int({ min: 1, max: 5 }),
    }
  })
  .build()
