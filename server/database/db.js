import mongoose from "mongoose";
import dotenv from "dotenv";
import chalker from "chalker";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(chalker("<red.bgGreen>MongoDB connected successfully</>"));
        console.log("Connected Database", mongoose.connection.name);
    } catch (error) {
        console.error(chalker("<red>Error connecting to MongoDB: </red>"), error.message);
        process.exit(1); // Exit the process with failure
    }

}

export default connectDB;