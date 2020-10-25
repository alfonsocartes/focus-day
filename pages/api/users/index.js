//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

import { connectToDatabase } from "../../../utils/dbConnect";

/*
 *
 * Users API
 * It's used to register and login users.
 *
 */

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

export default async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGO_URI);

  mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.set("useCreateIndex", true);

  const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

  userSchema.plugin(passportLocalMongoose);

  const User = new mongoose.model("User", userSchema);

  passport.use(User.createStrategy());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Select the "users" collection from the database
  const collection = await db.collection("users");

  const { method } = req;
  switch (method) {
    // Not used. Please look at /api/index.js
    case "GET":
      try {
        const users = await collection.find({}).toArray();
        res.status(200).json({ users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // Add new user to Mongo DB
    case "POST":
      try {
        const user = await collection.insertOne(req.body);
        res.status(201).json({ user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
