import mongoose from "mongoose"

const connectToMongoDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dalle")
        console.log("Connected to database.")
    } catch (error) {
        console.log("Unable to establish connection with database.")
    }
}

export default connectToMongoDb
