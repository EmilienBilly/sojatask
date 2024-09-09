import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TaskFactory } from '#database/factories/task_factory'
import { UserFactory } from '#database/factories/user_factory'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(5)

    await TaskFactory.createMany(5)
  }
}
