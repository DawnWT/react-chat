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

pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`
  )
  .catch(() => {
    console.log('could not create table for Postgres Socket Adapter')
    process.exit(1)
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
