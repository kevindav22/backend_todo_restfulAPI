const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, deleteAllTodos } = require('../controllers/todo');

// Todo routes
router.get('/', authenticateUser, getAllTodos);
router.get('/:id', authenticateUser, getTodoById);
router.post('/', authenticateUser, createTodo);
router.put('/:id', authenticateUser, updateTodo);
router.delete('/:id', authenticateUser, deleteTodo);
router.delete('/', authenticateUser, deleteAllTodos);

module.exports = router;
