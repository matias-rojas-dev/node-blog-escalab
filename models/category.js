

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Category name is required",
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Category", categorySchema)