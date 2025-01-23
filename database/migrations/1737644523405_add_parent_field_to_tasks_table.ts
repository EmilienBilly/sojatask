import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'add_parent_field_to_tasks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('parent_id').unsigned().nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('parent_id')
    })
  }
}
