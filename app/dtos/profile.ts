import { BaseModelDto } from '@adocasts.com/dto/base'
import Profile from '#models/profile'

export default class ProfileDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(profile?: Profile) {
    super()

    if (!profile) return
    this.id = profile.id
    this.name = profile.name
  }
}
