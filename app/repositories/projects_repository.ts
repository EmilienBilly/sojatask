import db from '@adonisjs/lucid/services/db'

export class ProjectRepository {
  findAllProjectsByUserId(userId: number) {
    return db.from('projects').where('created_by', userId)
  }
}
