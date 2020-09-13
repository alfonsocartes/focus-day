//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { connectToDatabase } from "../../../utils/dbConnect";

/*
 *
 * Single Task API Dinamic Route (next.js)
 * It's used to delete a Task by ID
 * The other methods are for future functionality
 *
 */

export default async (req, res) => {
  const db = await connectToDatabase(process.env.MONGO_URI);

  const collection = await db.collection("tasks");

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await collection.find({ id: id });
        if (!task) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, taskData: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const task = await collection.updateOne(
          { id: id },
          { $set: { checked: req.body.checked } }
        );
        // const task = await collection.replaceOne({ id: id }, req.body);
        if (!task) {
          return res.status(400).json({ success: false });
        }
        res.status(204).json({ success: true, taskData: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedTask = await collection.deleteOne({
          id: id,
        });
        if (!deletedTask) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, taskData: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
