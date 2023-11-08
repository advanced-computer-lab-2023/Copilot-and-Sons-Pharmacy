import mongoose, { Connection } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const url: string =
  process.env.MONGO_URI ||
  process.env.Mongo_URL ||
  'mongodb+srv://admin:admin@cluster0.ugek6la.mongodb.net/'

// Connect to MongoDB
try {
  mongoose.connect(url).then(() => {
    console.log('connected to server')
  })
} catch (error) {
  console.error('MongoDB connection error:', error)
}

const db: Connection = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

export default db
