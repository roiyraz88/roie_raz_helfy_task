import '../styles/TaskFilter.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="task-filter">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? 'active' : ''}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
