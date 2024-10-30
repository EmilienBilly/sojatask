import { defineConfig, drivers } from '@adonisjs/core/hash'
import { InferHashers } from '@adonisjs/core/types'
import { cakePhpDriver } from '../app/HashDrivers/cakephp_driver.js'

const hashConfig = defineConfig({
  default: 'cakephp',

  list: {
    scrypt: drivers.scrypt({
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    }),
    cakephp: cakePhpDriver(),
  },
})

export default hashConfig

/**
 * Inferring types for the list of hashers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}
