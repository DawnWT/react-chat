import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
})

const envParse = envSchema.safeParse(process.env)

if (!envParse.success) {
  console.error(envParse.error.issues)

  throw new Error('Invalid environment variables')
}

export const env = envParse.data
