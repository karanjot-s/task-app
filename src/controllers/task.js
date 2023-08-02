const Task = require("../models/Task");

exports.create = async (req, res) => {
  try {
    const { content, userId } = req.body;

    const task = await Task.create({
      content: content,
      userId: userId,
    });

    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });

    res.status(200).json({
      success: true,
      tasks: tasks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task || task.userId !== req.user.userId) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        error: "Task Not found",
      });
    }

    const query = await task.updateOne({ completed: !task.completed });

    return res.status(200).json({
      success: true,
      task: query,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
      err: err,
    });
  }
};

exports.deletePrd = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        error: "Task Not found",
      });
    }

    return res.status(200).json({
      success: true,
      task: task,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
      err: err,
    });
  }
};
