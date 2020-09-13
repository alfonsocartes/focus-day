// import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

// dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findOne({ id: id });
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
        const note = await Note.findOneAndUpdate({ id: id }, req.body, {
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
        const deletedNote = await Note.deleteOne({
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
