import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_tasks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('created_at').notNullable().alter()
      table.dateTime('updated_at').notNullable().alter()
      table.date('due_date').nullable().alter()
      table.date('start_date').nullable()
    })
  }
}
