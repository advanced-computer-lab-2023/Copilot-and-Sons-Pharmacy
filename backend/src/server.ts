import app from './app'
import db from './database'

const PORT = process.env.PORT || 3000
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
