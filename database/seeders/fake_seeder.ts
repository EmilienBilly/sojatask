import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import { TaskFactory } from '#database/factories/task_factory'
import { UserFactory } from '#database/factories/user_factory'
import TaskStatus from '#models/task_status'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(5)

    await TaskFactory.createMany(5)

    await Role.createMany([
      {
        name: 'user',
        active: true,
      },
      {
        name: 'admin',
        active: true,
      },
    ])

    await TaskStatus.createMany([
      {
        name: 'À faire',
      },
      {
        name: 'En cours',
      },
      {
        name: 'Terminé',
      },
    ])
  }
}
