//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

const mongoose = require("mongoose");

/*
 *
 * Mongoose User Model.
 *
 */

const thirdPartyProviderSchema = {
  provider_name: {
    type: String,
    default: null,
  },
  provider_id: {
    type: String,
    default: null,
  },
  provider_data: {
    type: {},
    default: null,
  },
};

const userSchema = {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  third_party_auth: [thirdPartyProviderSchema],
  date: {
    type: Date,
    default: Date.now,
  },
};

// If the model exists already, we will send that, if not, we will create it
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
