import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createServer } from 'http'

const app = new Hono()

const server = serve(
  {
    fetch: app.fetch,
    port: 8000,
    createServer,
  },
  (info) => {
    console.log('server listening on', info.port)
  }
)

