import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_workspace_invites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('workspace_id').unsigned().notNullable()
      table.integer('invited_by_user_id').unsigned().notNullable()
      table.integer('canceled_by_user_id').unsigned().nullable()
      table.string('email', 254).notNullable()
      table.integer('role_id').unsigned().notNullable()

      table.timestamp('accepted_at')
      table.timestamp('canceled_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
