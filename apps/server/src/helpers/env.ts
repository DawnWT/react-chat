import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_PORT: z.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
})

const envParse = envSchema.safeParse(process.env)

if (!envParse.success) {
  console.error(envParse.error.issues)

  throw new Error('Invalid environment variables')
}

export const env = envParse.data
