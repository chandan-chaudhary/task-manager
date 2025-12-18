# REST Client Test Files

This directory contains REST Client files for testing the Task Manager API endpoints.

## Prerequisites

Install the REST Client extension for VS Code:

- Extension ID: `humao.rest-client`
- Or search for "REST Client" in VS Code extensions

## Files

- **auth.http** - Authentication endpoints (register, login, get current user)
- **user.http** - User management endpoints
- **task.http** - Task CRUD operations with filtering
- **notification.http** - Notification management endpoints

## Usage

1. **Start the backend server**:

   ```bash
   npm run dev
   ```

2. **Update the auth token**:

   - First, use `auth.http` to register/login
   - Copy the JWT token from the response
   - Replace `@authToken = your-jwt-token-here` in each file with your actual token

3. **Send requests**:
   - Click "Send Request" above any request
   - Or use keyboard shortcut: `Ctrl+Alt+R` (Windows/Linux) or `Cmd+Alt+R` (Mac)

## Variables

Each file uses these common variables:

- `@baseUrl` - API base URL (default: http://localhost:5000/api)
- `@contentType` - Content type (application/json)
- `@authToken` - JWT authentication token

You can also use VS Code's REST Client environment variables in settings.

## Testing Flow

1. **Register a user** (`auth.http`)
2. **Login** to get the JWT token
3. **Update @authToken** in all files with the token from login response
4. **Create tasks** (`task.http`)
5. **Assign tasks** to users (this creates notifications)
6. **Check notifications** (`notification.http`)
7. **Update/delete** resources as needed

## Example Response

Successful response:

```json
{
  "status": "success",
  "data": {
    "user": { ... }
  }
}
```

Error response:

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "body.email",
      "message": "Invalid email format"
    }
  ]
}
```
