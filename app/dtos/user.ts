import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#models/user'

export default class UserDto extends BaseModelDto {
  declare id: number
  declare username: string
  declare password: string

  constructor(user?: User) {
    super()

    if (!user) return
    this.id = user.id
    this.username = user.username
    this.password = user.password
  }
}
