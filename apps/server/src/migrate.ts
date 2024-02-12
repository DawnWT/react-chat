import { promises as fs } from 'fs'
import { FileMigrationProvider, Migrator } from 'kysely'
import path from 'path'
import { fileURLToPath } from 'url'

import { db } from './database/db.js'

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

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

await migrateToLatest()
