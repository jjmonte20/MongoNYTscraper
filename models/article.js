var mongoose = require("mongoose");

// Save a reference to the schema constructor
var Schema = mongoose.Schema;

// Schema
var ArticleSchema = new Schema({
    // title
    title: {
        type: String,
        required: true
    },
    // link
    link: {
        type: String,
        required: true
    },
    // Saved, will need this value to display false at first and true when a user saves an article
    saved: {
        type: Boolean
    },
    // Note, keep in mind it needs to be stored as a note id
    note: [
        {
        type: Schema.Types.ObjectId,
        ref: "Note"
        }
    ]
});

// Create the model for the above schema
var Article = mongoose.model("Article", ArticleSchema);

// Exports the model
module.exports = Article;