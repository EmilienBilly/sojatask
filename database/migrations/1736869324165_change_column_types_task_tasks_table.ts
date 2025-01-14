import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_tasks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('due_date').nullable().alter()
      table.dateTime('start_date').nullable().alter()
    })
  }
}
