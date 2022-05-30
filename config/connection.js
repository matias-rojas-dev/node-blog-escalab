const mongoose = require("mongoose");

mongoose.connection.on("error", (error) => {
    console.log(error);
})
