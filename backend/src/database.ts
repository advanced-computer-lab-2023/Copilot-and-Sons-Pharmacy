import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url: string = process.env.Mongo_URL||"";
// Connect to MongoDB
try {
  mongoose.connect(url).then(() => {
    console.log("connected to server");
  });
} catch (error) {
  console.error("MongoDB connection error:", error);
}

const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
export default db;
