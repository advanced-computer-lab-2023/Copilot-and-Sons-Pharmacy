import mongoose, { Connection } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const url: string =
  process.env.MONGO_URI ||
  process.env.Mongo_URL ||
  'mongodb+srv://darinmfadel:Darin2002@cluster0.ghfjumf.mongodb.net/project1?retryWrites=true&w=majority'

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
