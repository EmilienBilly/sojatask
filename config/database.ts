import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'sojadispro_db',
  connections: {
    sojadispro_db: {
      client: 'mysql2',
      connection: {
        host: env.get('SP_DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('SP_DB_USER'),
        password: env.get('SP_DB_PASSWORD'),
        database: env.get('SP_DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
        disableRollbacksInProduction: true,
      },
    },
  },
})
export default dbConfig
