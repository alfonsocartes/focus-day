//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { connectToDatabase } from "../../../utils/dbConnect";

/*
 *
 * User's Tasks API Dinamic Route (next.js)
 * It's used to add and delete a task by ID for a particular User
 * The other methods are for future functionality
 *
 */

export default async (req, res) => {
  const db = await connectToDatabase(process.env.MONGO_URI);

  const {
    query: { id },
    method,
  } = req;

  const collection = await db.collection("tasks_" + id);

  switch (method) {
    // Add new task to Mongo DB
    case "POST":
      try {
        const note = await collection.insertOne(req.body);
        res.status(201).json({ note });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    // Modifies task (checked or unchecked)
    case "PUT":
      try {
        const task = await collection.updateOne(
          { id: req.body.id },
          { $set: { checked: req.body.checked } }
        );
        // const task = await collection.replaceOne({ id: id }, req.body);
        if (!task) {
          res.status(400).json({ success: false });
        }
        return res.status(204).json({ success: true, taskData: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // Deletes new task to Mongo DB
    case "DELETE":
      try {
        const deletedNote = await collection.deleteOne({
          id: req.body,
        });
        if (!deletedNote) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, noteData: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
