import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import { env } from '../helpers/env.js'
import { UserTable } from './tables/user.js'

interface Database {
  users: UserTable
}

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

export const db = new Kysely<Database>({ dialect })
