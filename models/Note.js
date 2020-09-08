const mongoose = require("mongoose");

const noteSchema = {
  title: {
    type: String,
    required: [true, "Please add a title."],
    unique: true,
    trim: true,
    maxlength: [40, "Title cannot be more than 40 characters."],
  },

  content: {
    type: String,
    required: true,
    maxlength: [500, "Content cannot be more than 500 characters."],
  },
};

// If the model exists already, we will send that, if not, we will create it
module.exports = mongoose.models.Note || mongoose.model("Note", noteSchema);
