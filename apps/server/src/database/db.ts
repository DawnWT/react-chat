import { Kysely, PostgresDialect } from 'kysely'
import pkg from 'pg'

import { env } from '../helpers/env.js'
import { UserTable } from './tables/user.js'
const { Pool } = pkg

const dialect = new PostgresDialect({
  pool: new Pool({
    host: env.DATABASE_URL,
    database: 'chat-app',
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT,
    max: 10,
  }),
})

export interface Database {
  users: UserTable
}

export const db = new Kysely<Database>({ dialect })
