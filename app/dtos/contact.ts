import { BaseModelDto } from '@adocasts.com/dto/base'
import Contact from '#models/contact'

export default class ContactDto extends BaseModelDto {
  declare id: number
  declare firstname: string
  declare lastname: string
  declare email: string | null

  constructor(contact?: Contact) {
    super()

    if (!contact) return
    this.id = contact.id
    this.firstname = contact.firstname
    this.lastname = contact.lastname
    this.email = contact.email
  }
}
