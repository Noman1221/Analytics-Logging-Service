import mongoose from "mongoose";

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database is connect");
    } catch (error) {
        console.log(error);
    }
}
export default ConnectDb