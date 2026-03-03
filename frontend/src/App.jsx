import { StrictMode, useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api.js';
import TaskForm from './components/TaskForm.jsx';
import TaskFilter from './components/TaskFilter.jsx';
import TaskList from './components/TaskList.jsx';
import './styles/App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselKey, setCarouselKey] = useState(0);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === 'completed') return t.completed;
      if (filter === 'pending') return !t.completed;
      return true;
    });
  }, [tasks, filter]);

  const fetchTasks = async () => {
    try {
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
    try {
      setError(null);
      await createTask(taskData);
      await fetchTasks();
      setCarouselKey(k => k + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      setError(null);
      await updateTask(id, taskData);
      setEditingTask(null);
      await fetchTasks();
      setCarouselKey(k => k + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      setError(null);
      await deleteTask(id);
      await fetchTasks();
      setCarouselKey(k => k + 1);
    } catch (err) {
      setError(err.message);
    }
  };  

  const handleToggle = async (id) => {
    try {
      setError(null);
      await toggleTask(id);
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app">
      <h1 className="app-title">Task Manager</h1>

      {error && <div className="error-banner">{error}</div>}

      <TaskForm
        key={editingTask ? editingTask.id : 'create'}
        onSubmit={editingTask ? (data) => handleUpdate(editingTask.id, data) : handleCreate}
        editingTask={editingTask}
        onCancel={handleCancelEdit}
      />

      <TaskFilter filter={filter} onFilterChange={setFilter} />

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          resetKey={filter + '-' + carouselKey}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default App;