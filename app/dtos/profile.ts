import { BaseModelDto } from '@adocasts.com/dto/base'
import Profile from '#models/profile'
import UserDto from '#dtos/user'

export default class ProfileDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare users: UserDto[]

  constructor(profile?: Profile) {
    super()

    if (!profile) return
    this.id = profile.id
    this.name = profile.name
    this.users = UserDto.fromArray(profile.users)
  }
}
