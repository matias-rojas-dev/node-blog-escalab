const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            text: true
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 100
        },
        body: {
            type: String,
            required: true,
            text: true
        },
        category: {
            type: ObjectId,
            ref: "Category"
        },
        images: {
            type: Array
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"]
        },
        author: {
            type: ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Post", postSchema)