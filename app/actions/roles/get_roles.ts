import Role from '#models/role'

export default class GetRoles {
  static async handle() {
    return Role.query().orderBy('name')
  }
}
