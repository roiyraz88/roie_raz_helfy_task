# Task Manager App

## Setup and Installation

### Backend

```bash
cd backend
npm install
npm start
```

Server runs on http://localhost:4000.
Use `npm run dev` for auto-reload during development.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on http://localhost:3000.
Make sure the backend is running before starting the frontend.

## API Documentation

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | /api/tasks              | Get all tasks          |
| POST   | /api/tasks              | Create a new task      |
| PUT    | /api/tasks/:id          | Update a task          |
| DELETE | /api/tasks/:id          | Delete a task          |
| PATCH  | /api/tasks/:id/toggle   | Toggle task completion |

### Task fields

- **title** (string, required) - 1 to 100 characters
- **description** (string, optional) - up to 500 characters
- **priority** (string, required) - "low", "medium", or "high"
- **completed** (boolean) - defaults to false on creation
- **createdAt** (string) - ISO date, set by the server
- **id** (number) - auto-generated

## Assumptions and Design Decisions

- Data is stored in memory, resets when the server restarts
- The server starts with a few sample tasks so the carousel has content right away
- After any create/update/delete the frontend re-fetches all tasks from the server
- The carousel shows one task at a time and auto-advances every 5 seconds, hover to pause
- Editing a task fills the form at the top of the page, no inline editing inside the carousel
- Deleting a task shows a confirmation dialog first
- No external carousel libraries were used, the infinite loop is built from scratch

## Time Spent

| Part                           | Time     |
| ------------------------------ | -------- |
| Backend API + validation       | ~45 min  |
| Frontend scaffold + API layer  | ~20 min  |
| TaskForm component             | ~20 min  |
| TaskFilter component           | ~10 min  |
| Carousel (TaskList + TaskItem) | ~60 min  |
| Styling                        | ~30 min  |
| Testing + debugging            | ~25 min  |
| README + cleanup               | ~10 min  |

<img width="1913" height="861" alt="image" src="https://github.com/user-attachments/assets/2c965b6b-6848-4293-83aa-1bcc816ebc50" />
