import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_boards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('title').notNullable()
      table.string('description')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.integer('workspace_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
