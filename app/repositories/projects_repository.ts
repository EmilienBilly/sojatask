import db from '@adonisjs/lucid/services/db'
import { ResultOf } from '../../types/common.js'

export type ProjectsCreatedByUserIdQueryResult = ResultOf<
  ProjectRepository,
  'findAllProjectsByUserId'
>

export class ProjectRepository {
  findAllProjectsByUserId(userId: number) {
    return db.from('projects').where('created_by', userId)
  }
}
