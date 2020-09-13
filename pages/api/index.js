//import dbConnect from "../../utils/dbConnect";
import Note from "../../models/Note";
// import Task from "../../models/Task";
import { connectToDatabase } from "../../utils/dbConnect";

// dbConnect();

// export default async function handler(req, res) {
//   const notes = await Note.find({});
//   const tasks = await Task.find({});
//   res.status(200).json({ notes: notes, tasks: tasks });
// }

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGO_URI);

  // Select the "notes" collection from the database
  const collection = await db.collection("notes");

  // Select the users collection from the database
  const notes = await collection.find({}).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ notes });
};
