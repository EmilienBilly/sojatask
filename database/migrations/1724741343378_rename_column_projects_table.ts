import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.renameColumn('name', 'title')
    })
  }
}
