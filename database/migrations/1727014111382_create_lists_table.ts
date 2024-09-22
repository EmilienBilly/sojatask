import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lists'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.integer('board_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
