import { z } from 'zod'

const envSchema = z.object({
  VITE_BACKEND_URL: z.string(),
})

const envParse = envSchema.safeParse(import.meta.env)

if (!envParse.success) {
  console.error(envParse.error.issues)
  console.error(import.meta.env)

  throw new Error('Invalid environment variables')
}

export const env = envParse.data
