import { promises as fs } from 'fs'
import { FileMigrationProvider, Migrator } from 'kysely'
import path from 'path'
import { fileURLToPath } from 'url'

import { db, pool } from './database/db.js'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const migrateToLatest = async function () {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  await pool
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

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}
;(async function () {
  await migrateToLatest()
})().catch(() => void 0)
