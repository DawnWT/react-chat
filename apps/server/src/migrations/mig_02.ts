import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async function (db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('room')
    .addColumn('id', 'serial', (col) => col.autoIncrement().primaryKey())
    .addColumn('user1_id', 'serial', (col) => col.notNull().references('user.id'))
    .addColumn('user2_id', 'serial', (col) => col.notNull().references('user.id'))
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .execute()

  await db.schema
    .createTable('message')
    .addColumn('id', 'serial', (col) => col.autoIncrement().primaryKey())
    .addColumn('parent_room', 'serial', (col) => col.notNull().references('room.id'))
    .addColumn('from', 'serial', (col) => col.notNull().references('user.id'))
    .addColumn('content', 'text')
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async function (db: Kysely<any>) {
  await db.schema.dropTable('room').execute()
  await db.schema.dropTable('message').execute()
}
