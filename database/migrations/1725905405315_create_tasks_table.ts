import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('name').notNullable()
      table.text('description')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.integer('archived').notNullable().defaultTo(0)
      table.integer('deadline').notNullable()
      table.integer('created_by')
      table.integer('list_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
