import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_tasks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.tinyint('completed', 1).notNullable().defaultTo(0)
      table.dateTime('completed_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('completed')
      table.dropColumn('completed_at')
    })
  }
}
