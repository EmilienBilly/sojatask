import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('name').notNullable().unique()
      table.text('description').notNullable()
      table.integer('created_by').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
