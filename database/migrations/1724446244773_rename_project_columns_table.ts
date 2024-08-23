import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.renameTable('project_columns', 'board_sections')
  }

  async down() {
    this.schema.dropTable('board_sections')
  }
}
