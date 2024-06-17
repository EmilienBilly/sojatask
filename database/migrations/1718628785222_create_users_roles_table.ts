import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.integer('user_id').notNullable()
      table.integer('role_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
