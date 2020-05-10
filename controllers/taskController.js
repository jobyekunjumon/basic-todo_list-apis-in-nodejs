const Task = require('../models/taskModel');

exports.postAddTask = (req, res, next) => {
    const title = req.body.title;
    const userId = req.body.userId;
    const date = new Date();
    const timestamp = date.getTime();
    const task = new Task(title, userId, timestamp, "open");
    task.save(result => {
      if(result !== false) {
        res.status(200).json({
          status: 'success',
          message: 'Task Created Successfully',
          task: result.ops
        });
      } else {
        res.status(500).json({
          status: 'failed',
          message: 'Could not create task'
        });
      }
    });
};

exports.deleteDeleteTask = (req, res, next) => {
  const userId = req.body.userId;
  const taskId = req.body.taskId;

  Task.delete(userId, taskId, result => {
    if(result !== false) {
      res.status(200).json({
        status: 'success',
        message: 'Task Deleted Successfully'
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: 'Could not delete task'
      });
    }
  });
};

exports.getTasks = (req, res, next) => {
  const userId = req.params.userId;
  const start = req.params.start;
  const limit = req.params.limit;

  Task.fetchAll(userId, start, limit, result => {
    if(result !== false) {
      res.status(200).json({
        status: 'success',
        message: 'Tasks Fetched Successfully',
        task: result
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: 'Could not fetch tasks'
      });
    }
  });
};

exports.getTaskById = (req, res, next) => { 
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  Task.findById(userId, taskId, result => {
    if(result !== false) {
      res.status(200).json({
        status: 'success',
        message: 'Task Fetched Successfully',
        task: result
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: 'Could not fetch task'
      });
    }
  });
};

exports.putModifyTask = (req, res, next) => {
  const userId = req.body.userId;
  const taskId = req.body.taskId;
  const title = req.body.title;
  const status = req.body.status;
  console.log(userId);
  console.log(taskId);
  console.log(title);
  console.log(status);

  Task.modify(userId, taskId, title, status, result => {
    if(result !== false) {
      res.status(200).json({
        status: 'success',
        message: 'Task Updated Successfully'
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: 'Could not delete task'
      });
    }
  });
};