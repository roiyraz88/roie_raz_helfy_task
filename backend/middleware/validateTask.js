const VALID_PRIORITIES = ['low', 'medium', 'high'];

function validateTask(req, res, next) {
  const { title, description, priority, completed } = req.body;

  if (!title || !/[a-zA-Z]/.test(title) || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must contain at least one letter' });
  }

  if (title.trim().length > 100) {
    return res.status(400).json({ error: 'Title must be 100 characters or less' });
  }

  if ( description !== undefined &&
    description.trim() !== "" &&
    !/[a-zA-Z]/.test(description)) {
    return res.status(400).json({ error: 'Description must be a string containing at least one letter' });
  }

  if (description && description.length > 500) {
    return res.status(400).json({ error: 'Description must be 500 characters or less' });
  }

  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
  }

  if (req.method === 'PUT' && completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  req.body.title = title.trim();
  req.body.description = description ? description.trim() : '';

  next();
}

module.exports = validateTask;
