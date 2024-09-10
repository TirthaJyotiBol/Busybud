import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongo_db_username = process.env.MONGO_USER_NAME;
const mongo_db_password = process.env.MONGO_USER_PASSWORD;

const mongo_db_uri = `mongodb+srv://${mongo_db_username}:${mongo_db_password}@cluster0.iyguytz.mongodb.net/myDatabase?retryWrites=true&w=majority`;

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongo_db_uri);
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    }
};
