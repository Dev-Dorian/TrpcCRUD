import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false)
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/trpcdb")
        console.log("Database is connected to", db.connection.db.databaseName)
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}