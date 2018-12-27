var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Note schema
var NoteSchema = new Schema({
    title: String,
    body: String
});

// Creates the model of the above schema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;