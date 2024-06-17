import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('title').notNullable()
      table.text('description')
      table.timestamp('created_at').notNullable()
      table.timestamp('modified_at').notNullable()
      table.integer('status_id').notNullable().defaultTo(1)
      table.integer('created_by').notNullable()
      table.integer('assigned_to')
      table.integer('column_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
