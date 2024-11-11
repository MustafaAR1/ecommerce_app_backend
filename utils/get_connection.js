import mongoose from "mongoose";


const getConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
            .catch(err => {
                console.error('Error connecting to MongoDB:', err);
                throw err;
            });
    
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}
export default getConnection;