import { connectToDatabase } from "../../../utils/dbConnect";

export default async (req, res) => {
  const db = await connectToDatabase(process.env.MONGO_URI);

  const collection = await db.collection("notes");

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
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

    case "PUT":
      try {
        const note = await collection.updateOne({ id: id }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!note) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, noteData: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedNote = await collection.deleteOne({
          id: id,
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
