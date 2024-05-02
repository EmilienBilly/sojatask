import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cda_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('login').nullable()
      table.string('password').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
