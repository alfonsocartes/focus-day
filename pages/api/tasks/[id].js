import dbConnect from "../../../utils/dbConnect";
import Task from "../../../models/Task";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
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
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!task) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, taskData: task });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedTask = await Task.deleteOne({
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
