import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'boards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('title').notNullable()
      table.string('description')
      table.integer('project_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
