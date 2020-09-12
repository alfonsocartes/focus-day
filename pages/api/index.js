import dbConnect from "../../utils/dbConnect";
import Note from "../../models/Note";

import Task from "../../models/Task";

dbConnect();

export default async function handler(req, res) {
  const notes = await Note.find({});
  const tasks = await Task.find({});
  res.status(200).json({ notes: notes, tasks: tasks });
}
