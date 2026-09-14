const mongoose = require("mongoose");

const connectToMongoDB = () => {
    const connectionURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_NAME}`;
    return mongoose.connect( connectionURL, {
        serverSelectionTimeoutMS: 200,
        socketTimeoutMS: 2000,
        connectTimeoutMS: 2000,
    });
}
module.exports = connectToMongoDB;
