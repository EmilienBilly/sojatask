import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_statuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('name', 50).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
