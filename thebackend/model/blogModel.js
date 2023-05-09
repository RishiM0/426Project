const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

// figure out how to put Ids in the schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('blog', blogSchema)