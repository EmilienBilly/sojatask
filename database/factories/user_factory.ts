import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    const password = 'password123'

    return {
      username: faker.internet.userName(),
      password: password,
    }
  })
  .build()
