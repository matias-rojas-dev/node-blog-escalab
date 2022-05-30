const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }, 
        image: String,
        role: {
            type: String,
            default: "reader",
            enum: ["blogger", "reader"]
        },
    },
    {
        timestamps: true
    }
)

// pre save the user, we hash the pass
userSchema.pre('save', async function (next) {
    if(!this.isModified("password")) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next()
});


userSchema.methods = {
    // compare the password with the hash
    comparePasswords: function(password) {
        return bcrypt.compareSync(password, this.password)
    }
}

// send alert when this email already exists
userSchema.post("save", function(error, doc, next) {
    if(error.name === "MongoError" && error.code === 11000)
        next("Email already exists");
    else next(error);
})

module.exports = mongoose.model("User", userSchema)