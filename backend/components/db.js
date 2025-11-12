import mongoose from'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            ssl: true,
            tlsAllowInvalidCertificates: true,
        });
        console.log('MongoDB connected...');
    } catch (e){
        console.error(e);
    }
}

export default connectDB;