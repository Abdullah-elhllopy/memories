const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: String,
        message: String,
        tags: [String],
        selectedFile: String,
        likeCount: {
            type: Number,
            default: 0,
        },
        creator: String,
        createdAt: {
            type: Date,
            default: new Date(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
})
const postMessage = mongoose.model("PostMessage", postSchema);
module.exports = postMessage;