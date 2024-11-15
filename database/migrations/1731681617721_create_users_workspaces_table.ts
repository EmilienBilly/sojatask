import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_users_workspaces'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id')
      table.integer('workspace_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
