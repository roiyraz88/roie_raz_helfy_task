const BASE = 'http://localhost:4000/api/tasks';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

export const getTasks = async () => {
  const res = await fetch(BASE);
  return handleResponse(res);
};

export const createTask = async (taskData) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const updateTask = async (id, taskData) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

export const toggleTask = async (id) => {
  const res = await fetch(`${BASE}/${id}/toggle`, {
    method: 'PATCH',
  });
  return handleResponse(res);
};
