//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { connectToDatabase } from "../../../utils/dbConnect";

/*
 *
 * Single Note API Dinamic Route (next.js)
 * It's used to add and delete a note by ID
 * The other methods are for future functionality
 *
 */

export default async (req, res) => {
  const db = await connectToDatabase(process.env.MONGO_URI);

  const {
    query: { id },
    method,
  } = req;

  const collection = await db.collection("notes_" + id);

  switch (method) {
    // Not used in this app.
    case "GET":
      try {
        const note = await collection.find({ id: id });
        if (!note) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, noteData: note });
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
    // Not used in this app.
    case "PUT":
      try {
        const note = await collection.updateOne({ id: id }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!note) {
          return res.status(400).json({ success: false });
        }
        res.status(204).json({ success: true, noteData: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // Deletes new note to Mongo DB
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
