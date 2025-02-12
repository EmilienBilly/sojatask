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
      table.timestamp('start_date').nullable()
      table.integer('order').unsigned()
      table.boolean('archived').notNullable().defaultTo(false)
      table.integer('created_by').unsigned().notNullable()
      table.integer('column_id').unsigned().notNullable()
      table.integer('parent_id').unsigned().nullable()
      table.tinyint('completed', 1).notNullable().defaultTo(0)
      table.timestamp('completed_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
