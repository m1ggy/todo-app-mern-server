const express = require('express');
const router = express.Router();
const { todo } = require('../models/todoModel');

router.route('/').get(async (req, res) => {
  const allTodos = await todo.find({}).exec();
  res.status(201).json(allTodos);
});

router.route('/add-new-todo').post(async (req, res) => {
  if (req.body) {
    const { title, done, description, datePosted } = req.body;

    const newTodo = new todo({
      title,
      done,
      description,
      datePosted,
    });
    try {
      await newTodo.save();
      res.status(200).json({ message: 'Succesfully created todo!' });
      return;
    } catch {
      res.status(400).json({ message: 'failed to create todo.' });
    }
  }
  res
    .status(200)
    .json({ message: 'No data was received. Please provide data!' });
});

router.route('/delete-todo').post(async (req, res) => {
  if (req.body) {
    const { id } = req.body;
    console.log(req.body);
    try {
      await todo.deleteOne({ _id: id });
      return res.status(200).json({ message: `Deleted todo. ID:${id}` });
    } catch {
      return res.status(400).json({ message: 'failed to delete todo.' });
    }
  }
  res
    .status(200)
    .json({ message: 'No data was received. Please provide data!' });
});

router.route('/update-todo').post(async (req, res) => {
  if (req.body) {
    const { id, done } = req.body;

    todo
      .findByIdAndUpdate(id, {
        done,
      })
      .then((doc) => {
        return res.status(200).json({ message: `Updated ${doc.title}` });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ message: `Failed to update todo. Error: ${err}` });
      });

    return;
  }

  res
    .status(400)
    .json({ message: 'No data was received. Please provide data!' });
});

module.exports = router;
