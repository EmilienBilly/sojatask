import { createHash } from 'node:crypto'
import { HashDriverContract } from '@adonisjs/core/types/hash'
import env from '#start/env'

export class CakePhpDriver implements HashDriverContract {
  private readonly salt: string

  constructor() {
    this.salt = env.get('CAKEPHP_SALT', '')
  }

  isValidHash(value: string): boolean {
    return /^[a-f0-9]{64}$/.test(value)
  }

  async make(value: string): Promise<string> {
    const saltedPassword = this.salt + value
    return createHash('sha256').update(saltedPassword).digest('hex')
  }

  async verify(hashedValue: string, plainValue: string): Promise<boolean> {
    const saltedPassword = this.salt + plainValue
    const hashedPlainValue = createHash('sha256').update(saltedPassword).digest('hex')
    return hashedPlainValue === hashedValue
  }

  needsReHash(): boolean {
    return false
  }
}

export function cakePhpDriver() {
  return () => new CakePhpDriver()
}
