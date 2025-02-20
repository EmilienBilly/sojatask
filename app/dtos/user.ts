import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#models/user'
import ContactDto from '#dtos/contact'
import ProfileDto from '#dtos/profile'

export default class UserDto extends BaseModelDto {
  declare id: number
  declare username: string
  declare password: string
  declare contact: ContactDto | null
  declare profiles: ProfileDto[]

  declare meta: Record<string, any>

  constructor(user?: User) {
    super()

    if (!user) return
    this.id = user.id
    this.username = user.username
    this.password = user.password
    this.contact = user.contact && new ContactDto(user.contact)
    this.profiles = ProfileDto.fromArray(user.profiles)
    this.meta = user.$extras
  }
}
