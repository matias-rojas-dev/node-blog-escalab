const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user")

passport.use(new LocalStrategy({

    usernameField: "email",
    passwordField: "password"

}, async (email, password, done) => {
    const userAuth = await User.findOne({
        email
    });

    if(!userAuth) return done(null, false, {
        message: "User not found with this email"
    })
        
    const checkPassword = userAuth.comparePasswords(password);
    
    if(!checkPassword) return done(null, false, {
        message: "Password incorrect"
    });

    return done(null, userAuth)

}));

passport.serializeUser((userAuth, done) => done(null, userAuth._id))

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).exec();
    return done(null, user)
})

module.exports = passport;