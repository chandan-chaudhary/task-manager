# API Documentation - Task Manager

## Base URL

```
http://localhost:3001/api
```

## Authentication

Most endpoints require authentication via JWT token sent in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /api/auth/register

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /api/auth/login

Authenticate user and get JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### GET /api/auth/me

Get current authenticated user profile.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T10:00:00.000Z"
    }
  }
}
```

---

## Task Endpoints

### GET /api/tasks

Get all tasks with optional filtering and sorting.

**Headers:** Requires `Authorization: Bearer <token>`

**Query Parameters:**

- `status` - Filter by status: `TODO`, `IN_PROGRESS`, `REVIEW`, `COMPLETED`
- `priority` - Filter by priority: `LOW`, `MEDIUM`, `HIGH`, `URGENT`
- `assignedToMe` - Filter tasks assigned to current user: `true`
- `createdByMe` - Filter tasks created by current user: `true`
- `overdue` - Filter overdue tasks: `true`
- `sortBy` - Sort field: `dueDate`, `priority`, `status`, `createdAt`, `title`
- `sortOrder` - Sort direction: `asc`, `desc`

**Response:**

```json
{
  "status": "success",
  "results": 5,
  "data": {
    "tasks": [
      {
        "id": 1,
        "title": "Implement login feature",
        "description": "Create login page and API integration",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "dueDate": "2025-12-25T00:00:00.000Z",
        "creatorId": 1,
        "assignedToId": 2,
        "createdAt": "2025-12-19T10:00:00.000Z",
        "updatedAt": "2025-12-19T10:00:00.000Z"
      }
    ]
  }
}
```

### GET /api/tasks/:id

Get a single task by ID.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "data": {
    "task": {
      "id": 1,
      "title": "Implement login feature",
      "description": "Create login page and API integration",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "dueDate": "2025-12-25T00:00:00.000Z",
      "creatorId": 1,
      "assignedToId": 2,
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T10:00:00.000Z"
    }
  }
}
```

### POST /api/tasks

Create a new task.

**Headers:** Requires `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "Implement login feature",
  "description": "Create login page and API integration",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2025-12-25T00:00:00.000Z",
  "assignedToId": 2
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "task": {
      "id": 1,
      "title": "Implement login feature",
      "description": "Create login page and API integration",
      "status": "TODO",
      "priority": "HIGH",
      "dueDate": "2025-12-25T00:00:00.000Z",
      "creatorId": 1,
      "assignedToId": 2,
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T10:00:00.000Z"
    }
  }
}
```

### PATCH /api/tasks/:id

Update an existing task.

**Headers:** Requires `Authorization: Bearer <token>`

**Request Body:** (all fields optional)

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "priority": "URGENT",
  "dueDate": "2025-12-26T00:00:00.000Z",
  "assignedToId": 3
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "task": {
      "id": 1,
      "title": "Updated title",
      "description": "Updated description",
      "status": "IN_PROGRESS",
      "priority": "URGENT",
      "dueDate": "2025-12-26T00:00:00.000Z",
      "creatorId": 1,
      "assignedToId": 3,
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T11:00:00.000Z"
    }
  }
}
```

### DELETE /api/tasks/:id

Delete a task.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:** `204 No Content`

### GET /api/tasks/stats

Get dashboard statistics for tasks.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "data": {
    "stats": {
      "totalTasks": 25,
      "completedTasks": 10,
      "overdueTasks": 3,
      "tasksAssignedToMe": 8,
      "tasksCreatedByMe": 12,
      "tasksByStatus": {
        "To Do": 5,
        "In Progress": 8,
        "Review": 2,
        "Completed": 10
      },
      "tasksByPriority": {
        "Low": 5,
        "Medium": 10,
        "High": 7,
        "Urgent": 3
      }
    }
  }
}
```

---

## User Endpoints

### GET /api/users

Get all users (useful for task assignment).

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "results": 3,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2025-12-19T10:00:00.000Z",
        "updatedAt": "2025-12-19T10:00:00.000Z"
      }
    ]
  }
}
```

### GET /api/users/:id

Get a single user by ID.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T10:00:00.000Z"
    }
  }
}
```

### PATCH /api/users/:id

Update user profile.

**Headers:** Requires `Authorization: Bearer <token>`

**Request Body:** (all fields optional)

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Updated",
      "email": "john.updated@example.com",
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T12:00:00.000Z"
    }
  }
}
```

### DELETE /api/users/:id

Delete a user account.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:** `204 No Content`

---

## Notification Endpoints

### GET /api/notifications

Get all notifications for current user.

**Headers:** Requires `Authorization: Bearer <token>`

**Query Parameters:**

- `isRead` - Filter by read status: `true` or `false`

**Response:**

```json
{
  "status": "success",
  "results": 5,
  "data": {
    "notifications": [
      {
        "id": 1,
        "userId": 1,
        "taskId": 5,
        "message": "You have been assigned a new task: Implement login feature",
        "isRead": false,
        "createdAt": "2025-12-19T10:00:00.000Z"
      }
    ]
  }
}
```

### GET /api/notifications/unread-count

Get count of unread notifications.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "data": {
    "count": 3
  }
}
```

### GET /api/notifications/:id

Get a single notification by ID.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "data": {
    "notification": {
      "id": 1,
      "userId": 1,
      "taskId": 5,
      "message": "You have been assigned a new task",
      "isRead": false,
      "createdAt": "2025-12-19T10:00:00.000Z"
    }
  }
}
```

### PATCH /api/notifications/:id/read

Mark a notification as read.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "data": {
    "notification": {
      "id": 1,
      "userId": 1,
      "taskId": 5,
      "message": "You have been assigned a new task",
      "isRead": true,
      "createdAt": "2025-12-19T10:00:00.000Z"
    }
  }
}
```

### PATCH /api/notifications/mark-all-read

Mark all notifications as read.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:**

```json
{
  "status": "success",
  "message": "All notifications marked as read"
}
```

### DELETE /api/notifications/:id

Delete a notification.

**Headers:** Requires `Authorization: Bearer <token>`

**Response:** `204 No Content`

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "status": "error",
  "message": "Error description here"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Frontend Integration

The frontend API service is located at `/frontend/services/api.ts` and provides TypeScript-friendly wrappers for all these endpoints:

### Authentication

- `authService.login(credentials)`
- `authService.register(data)`
- `authService.getCurrentUser()`
- `authService.logout()`
- `authService.updateProfile(userId, data)`

### Tasks

- `taskService.getTasks(filters, sort)`
- `taskService.getTask(id)`
- `taskService.createTask(data)`
- `taskService.updateTask(id, data)`
- `taskService.deleteTask(id)`

### Users

- `userService.getUsers()`
- `userService.getUser(id)`
- `userService.updateUser(id, data)`
- `userService.deleteUser(id)`

### Notifications

- `notificationService.getNotifications()`
- `notificationService.getUnreadCount()`
- `notificationService.getNotification(id)`
- `notificationService.markAsRead(id)`
- `notificationService.markAllAsRead()`
- `notificationService.deleteNotification(id)`

### Dashboard

- `dashboardService.getStats()`

---

## Environment Variables

Create a `.env` file in both frontend and backend directories:

### Backend `.env`

```env
PORT=3001
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
