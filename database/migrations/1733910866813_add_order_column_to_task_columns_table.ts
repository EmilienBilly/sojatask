import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_columns'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('order')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
