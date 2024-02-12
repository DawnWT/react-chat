import { z } from 'zod'

const envSchema = z.object({
  BACKEND_URL: z.string(),
})

const envParse = envSchema.safeParse(process.env)

if (!envParse.success) {
  console.error(envParse.error.issues)

  throw new Error('Invalid environment variables')
}

export const env = envParse.data
