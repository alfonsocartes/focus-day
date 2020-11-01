import { connectToDatabase } from "../../../utils/dbConnect";

// const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bcrypt = require("bcrypt");
const v4 = require("uuid").v4;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

const saltRounds = 10;

function findUser(db, email, callback) {
  const collection = db.collection("users");
  collection.findOne({ email }, callback);
}

function createUser(db, email, password, callback) {
  const collection = db.collection("users");
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    collection.insertOne(
      {
        userId: v4(),
        email,
        password: hash,
      },
      function (err, userCreated) {
        assert.strictEqual(err, null);
        callback(userCreated);
      }
    );
  });
}

export default async (req, res) => {
  if (req.method === "POST") {
    // signup
    try {
      assert.notStrictEqual(null, req.body.email, "Email required");
      assert.notStrictEqual(null, req.body.password, "Password required");
    } catch (bodyError) {
      res.status(403).json({ error: true, message: bodyError.message });
    }

    const db = await connectToDatabase(process.env.MONGO_URI);

    const email = req.body.email;
    const password = req.body.password;
    // verify email does not exist already
    findUser(db, email, function (err, user) {
      if (err) {
        res.status(500).json({ error: true, message: "Error finding User" });
        return;
      }
      if (!user) {
        // proceed to Create
        createUser(db, email, password, function (creationResult) {
          if (creationResult.ops.length === 1) {
            const user = creationResult.ops[0];
            // JSON Web Token creation
            const token = jwt.sign(
              { userId: user.userId, email: user.email },
              jwtSecret,
              {
                expiresIn: 3000, //50 minutes
              }
            );
            res.status(200).json({ token });
            return;
          }
        });
      } else {
        // User exists
        res.status(403).json({ error: true, message: "Email exists" });
        return;
      }
    });
  }
};
