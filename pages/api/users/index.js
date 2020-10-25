//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { connectToDatabase } from "../../../utils/dbConnect";

/*
 *
 * Users API
 * It's used to register and login users.
 *
 */

export default async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGO_URI);

  // Select the "tasks" collection from the database
  const collection = await db.collection("tasks");

  const { method } = req;
  switch (method) {
    // Not used. Please look at /api/index.js
    case "GET":
      try {
        const notes = await collection.find({}).toArray();
        res.status(200).json({ notes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // Add new note to Mongo DB
    case "POST":
      try {
        const note = await collection.insertOne(req.body);
        res.status(201).json({ note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
