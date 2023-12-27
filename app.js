const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize('todo_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Database synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.use(express.json());

// CRUD Endpoints
app.post('/todos', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.create({ title, description, completed });
    res.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    await todo.destroy();
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/todos', async (req, res) => {
  try {
    // Hapus semua ToDo
    await Todo.destroy({ where: {} });
    res.json({ message: 'All todos deleted successfully' });
  } catch (error) {
    console.error('Error deleting all todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Registrasi Endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await User.create({ username, password: hashedPassword });

    res.json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Bandingkan password yang dihash
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Jika password tidak cocok
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
