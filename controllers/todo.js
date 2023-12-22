const { Todo } = require('../models');

// ...

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createTodo = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const todo = await Todo.create({ title, description, completed, userId: req.user.id });
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateTodo = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title;
    todo.description = description;
    todo.completed = completed;

    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    await Todo.destroy({ where: { userId: req.user.id } });

    res.json({ message: 'All todos deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
