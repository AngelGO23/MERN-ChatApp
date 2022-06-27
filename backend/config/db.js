import mongoose from "mongoose";
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URI)

    try {
        const conn = await client.connect()

        console.log(`MongoDb connected`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();

    }
};

export default connectDB;