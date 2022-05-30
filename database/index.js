const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CLOUD, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log("Database has been connected");
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1); //use this command to end the connection if we had any error
    }
}

module.exports = connectDB;