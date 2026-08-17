import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const connect = await mongoose.connect(process.env.Mongo_URI);
        console.log(`MongoDb connected:${connect.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection error:${error.message}`)
        process.exit(1)
    }
}

export default connectDB;