import factory from '@adonisjs/lucid/factories'
import List from '#models/column'

export const ListFactory = factory
  .define(List, ({ faker }) => {
    return {
      title: faker.lorem.words(2),
      boardId: faker.number.int({ min: 1, max: 2 }),
    }
  })
  .build()
