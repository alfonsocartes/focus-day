import { connectToDatabase } from "../../../utils/dbConnect";

const assert = require("assert");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

const saltRounds = 10;

function findUser(db, email, callback) {
  const collection = db.collection("users");
  collection.findOne({ email }, callback);
}

function authUser(db, email, password, hash, callback) {
  const collection = db.collection("users");
  bcrypt.compare(password, hash, callback);
}

export default async (req, res) => {
  if (req.method === "POST") {
    //login
    try {
      assert.notStrictEqual(null, req.body.email, "Email required");
      assert.notStrictEqual(null, req.body.password, "Password required");
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

    const db = await connectToDatabase(process.env.MONGO_URI);

    const email = req.body.email;
    const password = req.body.password;

    findUser(db, email, function (err, user) {
      if (err) {
        res.status(500).json({ error: true, message: "Error finding User" });
        return;
      }
      if (!user) {
        res.status(404).json({ error: true, message: "User not found" });
        return;
      } else {
        authUser(db, email, password, user.password, function (err, match) {
          if (err) {
            res.status(500).json({ error: true, message: "Auth Failed" });
          }
          if (match) {
            const token = jwt.sign(
              { userId: user.userId, email: user.email },
              jwtSecret,
              {
                expiresIn: 3000, //50 minutes
              }
            );
            res.status(200).json({ token });
            return;
          } else {
            res.status(401).json({ error: true, message: "Auth Failed" });
            return;
          }
        });
      }
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};
