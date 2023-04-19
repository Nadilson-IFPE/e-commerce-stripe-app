import mongoose from "mongoose";

export async function initMongoose() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    return await mongoose
        .connect(process.env.NEXT_PUBLIC_MONGODB_URL as string)
        .catch((error) => console.log(error));
}
