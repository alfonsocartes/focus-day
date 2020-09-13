//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

const mongoose = require("mongoose");

/*
 *
 * Mongoose Note Model.
 * It's not going to be used in this app.
 * Please take a look at /api/index.js. It's works better with Vercel.
 *
 */

const noteSchema = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Please add a title."],
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
