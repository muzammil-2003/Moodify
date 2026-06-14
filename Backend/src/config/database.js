const mongoose = require('mongoose')

const connectDb = async () => {
    try {

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully connected to database.");
    } catch (error) {
        console.log("Error connecting to database: ", error.message);
        process.exit(1)
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log("MongoDB connection closed due to app termination");
    process.exit(0)
})

module.exports = connectDb