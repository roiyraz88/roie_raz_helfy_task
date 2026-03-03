import { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [priority, setPriority] = useState(editingTask?.priority || 'medium');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      ...(editingTask && { completed: editingTask.completed }),
    });

    if (!editingTask) {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          className="form-input"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <textarea
        className="form-textarea"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
        rows={2}
      />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};  

export default TaskForm;
