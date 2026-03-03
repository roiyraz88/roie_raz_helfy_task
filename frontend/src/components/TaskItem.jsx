import "../styles/TaskItem.css";

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div
      className={`task-item priority-${task.priority} ${task.completed ? "completed" : ""}`}
    >
      <div className="task-header">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
        <span className="task-date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-actions">
        <button
          className={`btn btn-toggle ${task.completed ? "done" : ""}`}
          onClick={() => onToggle(task.id)}
          title={task.completed ? "Mark pending" : "Mark complete"}
        >
          {task.completed ? "Completed" : "Mark Complete"}{" "}
        </button>
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
