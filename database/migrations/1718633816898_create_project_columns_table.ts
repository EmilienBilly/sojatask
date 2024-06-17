import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_columns'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('name').notNullable()
      table.integer('project_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
