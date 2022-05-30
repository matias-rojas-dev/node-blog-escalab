const express = require("express");
const mongoose = require("mongoose");
//const morgan = require("morgan");
const connectDB = require("./database");
const cors = require("cors");
const {readdirSync} = require('fs');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerConfig = require("./documentation/swagger.config.json");
const swaggerUI = require("swagger-ui-express");
const passport = require("./config/passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const expressValidator = require("express-validator");
const flash = require("connect-flash");

require('dotenv').config();

const app = express();


// validator files with express-validator
app.use(expressValidator());

// connect db
connectDB();

// middlewares
//app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());


// session middleware with passport and mongo store
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// swagger
const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));

// flash messages middleware for flash messages 
app.use(flash());
app.use((req, res, next) => {
    res.locals.menssages = req.flash();
    next();
});

// routes
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// connect to port
const port = process.env.PORT || 8002;

app.listen(port, () => {
    console.log(`Server's running at port ${port}`)
})

