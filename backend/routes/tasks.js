const express = require('express');
const router = express.Router();
const validateTask = require('../middleware/validateTask');

let tasks = [
  {
    id: 1, 
    title: 'Wake up at 8:00 AM',
    description: 'Get up from bed and start the day after a good night\'s sleep.',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'high'
  },
  {
    id: 2,
    title: 'Brush teeth',
    description: 'Brush teeth with toothbrush and toothpaste.',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'high'
  },
  {
    id: 3,
    title: 'Eat breakfast',
    description: 'Eat breakfast with eggs, avocado, and toast.',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Go to work',
    description: 'Go to work to earn money and provide for my family.',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'high'
  },
  {
    id: 5,
    title: 'Go to gym',
    description: 'Go to gym to stay fit and healthy.',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'low'
  },
];
let nextId = 6;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', validateTask, (req, res) => {
  const { title, description, priority } = req.body;
  const task = {
    id: nextId++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    priority
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', validateTask, (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid task ID'});
  }

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found'});
  }

  const { title, description, priority, completed } = req.body;

  task.title = title;
  task.description = description || '';
  task.priority = priority;

  if (typeof completed === 'boolean') {
    task.completed = completed;
  }

  res.json(task);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid task ID'});
  }

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found'});
  }

  tasks.splice(tasks.indexOf(task), 1);
  res.json({ message: 'Task deleted successfully'});
});

router.patch('/:id/toggle', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid task ID'});
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found'});
  }

  task.completed = !task.completed;
  res.json(task);
});

module.exports = router;
