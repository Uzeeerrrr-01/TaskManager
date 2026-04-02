# Taskly Backend — Node.js + Express + MongoDB

REST API for the Taskly task assignment dashboard.

## Tech Stack
- **Node.js** + **Express** — server & routing
- **MongoDB** + **Mongoose** — database & ODM
- **dotenv** — environment config
- **cors** — cross-origin requests

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set your MongoDB URI:
```
MONGO_URI=mongodb://localhost:27017/taskly   # local
# or
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/taskly  # Atlas
```

### 3. Seed the database (first time only)
```bash
node seed.js
```

### 4. Start the server
```bash
npm run dev     # development (nodemon)
npm start       # production
```

Server runs at: `http://localhost:5000`

---

## API Reference

### Health Check
| Method | Endpoint       | Description     |
|--------|---------------|-----------------|
| GET    | /api/health   | Server status   |

### Tasks
| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/tasks         | Get all tasks            |
| GET    | /api/tasks/stats   | Get task stats           |
| GET    | /api/tasks/:id     | Get single task          |
| POST   | /api/tasks         | Create task              |
| PUT    | /api/tasks/:id     | Update task              |
| DELETE | /api/tasks/:id     | Delete task              |

**Query params for GET /api/tasks:**
- `status` — `open` | `inprog` | `done`
- `priority` — `High` | `Medium` | `Low`
- `search` — searches title (case-insensitive)

### Users
| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/users         | Get all users + counts   |
| GET    | /api/users/:id     | Get single user          |
| POST   | /api/users         | Create user              |
| PUT    | /api/users/:id     | Update user              |
| DELETE | /api/users/:id     | Delete user              |

---

## Example Requests

### Create a task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fix login bug",
    "user": "Sarah Chen",
    "priority": "High",
    "status": "open",
    "due": "2026-04-25",
    "desc": "Users can'\''t log in on mobile Safari"
  }'
```

### Get tasks filtered by status
```bash
curl "http://localhost:5000/api/tasks?status=inprog"
```

### Update a task
```bash
curl -X PUT http://localhost:5000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{ "status": "done" }'
```

---

## Project Structure
```
taskly-backend/
├── server.js                  # Entry point
├── seed.js                    # Database seeder
├── .env                       # Environment variables
├── models/
│   ├── Task.js                # Task schema
│   └── User.js                # User schema
├── controllers/
│   ├── taskController.js      # Task CRUD logic
│   └── userController.js      # User CRUD logic
├── routes/
│   ├── tasks.js               # Task routes
│   └── users.js               # User routes
└── middleware/
    └── errorHandler.js        # 404 + global error handler
```

---

## Connecting the Frontend

In your React project open `src/services/api.js` — it's already configured.
Just make sure your `.env` has:
```
CLIENT_URL=http://localhost:5173
```
And in `App.jsx`, uncomment the API import lines and replace `useState(SEED_TASKS)` with a `useEffect` that calls `getTasks()`.
