import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'emilien.billy',
        password: 'password',
      },
      {
        username: 'administrateur.soja',
        password: 'admin',
      },
    ])

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
  }
}
