import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles_permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.integer('role_id').notNullable()
      table.integer('permission_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
