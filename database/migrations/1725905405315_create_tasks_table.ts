import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('title').notNullable()
      table.text('description').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('due_date').nullable()
      table.boolean('archived').notNullable()
      table.integer('created_by').notNullable()
      table.integer('list_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
