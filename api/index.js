import { handle } from '@hono/vercel'
import app from '../dist/index.js'

export const config = {
  runtime: 'edge',
}

export default handle(app)
