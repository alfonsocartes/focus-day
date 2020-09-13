//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

const mongoose = require("mongoose");

/*
 *
 * Mongoose Task Model.
 * It's not going to be used in this app.
 * Please take a look at /api/index.js. It's works better with Vercel.
 *
 */

const taskSchema = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: [true, "Task cannot be empty."],
    unique: true,
    trim: true,
    maxlength: [40, "Task cannot be more than 40 characters."],
  },
};

// If the model exists already, we will send that, if not, we will create it
module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
