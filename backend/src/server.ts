import app from './app'
import db from './database'
import { createServer } from 'http'
import { initializeSocket } from './socket'

const PORT = process.env.PORT || 4000

const server = createServer(app)

export const socketIOServer = initializeSocket(server)

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
