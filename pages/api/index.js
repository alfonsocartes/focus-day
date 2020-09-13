//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { connectToDatabase } from "../../utils/dbConnect";

/*
 *
 * Mongo DB connection.
 * This document is for getting the initial props for the App component using NextJS API Routing
 *
 */

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGO_URI);

  // Select the "notes" collection from the database
  const collection = await db.collection("notes");

  // Select the notes collection from the database
  const notes = await collection.find({}).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ notes });
};
