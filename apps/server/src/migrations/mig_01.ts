import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async function (db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('id_name', 'text', (col) => col.notNull().unique())
    .addColumn('display_name', 'text', (col) => col.notNull())
    .addColumn('password', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async function (db: Kysely<any>) {
  await db.schema.dropTable('users').execute()
}
