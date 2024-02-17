import { Kysely, PostgresDialect } from 'kysely'
import pkg from 'pg'

import { env } from '../helpers/env.js'
import { MessageTable } from './tables/message.js'
import { RoomTable } from './tables/room.js'
import { UserTable } from './tables/user.js'
const { Pool } = pkg

// eslint-disable-next-line import/exports-last
export const pool = new Pool({
  host: env.DATABASE_URL,
  database: 'chat-app',
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
})

const dialect = new PostgresDialect({
  pool: pool,
})

export interface Database {
  users: UserTable
  rooms: RoomTable
  messages: MessageTable
}

export const db = new Kysely<Database>({ dialect })
