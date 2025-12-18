# Task Manager Backend

Backend API for Task Manager application built with Node.js, Express, TypeScript, Prisma, and PostgreSQL following industry best practices.

## Architecture

This backend follows a **clean layered architecture** with clear separation of concerns:

### 🏗️ Architecture Layers

1. **Controllers** (`src/controllers/`)

   - Handle HTTP requests and responses
   - Minimal business logic
   - Delegate to service layer
   - Return consistent HTTP status codes

2. **Services** (`src/services/`)

   - Contain business logic
   - Orchestrate data operations
   - Handle complex operations and validations
   - Independent of HTTP layer

3. **Repositories** (`src/repositories/`)

   - Data access layer
   - Direct database interactions via Prisma
   - Query building and optimization
   - Abstraction over database operations

4. **DTOs** (`src/dto/`)

   - Data Transfer Objects with Zod validation
   - Input validation schemas
   - Type-safe data structures
   - Automatic validation errors

5. **Middleware** (`src/middleware/`)
   - Authentication (JWT)
   - Validation (Zod schemas)
   - Error handling
   - Request preprocessing

## Features

- 🔐 **JWT Authentication** - Secure token-based auth
- 👥 **User Management** - CRUD operations with authorization
- ✅ **Task Management** - Full task lifecycle management
- 🔔 **Real-time Notifications** - Task assignment alerts
- 🗄️ **PostgreSQL with Prisma ORM** - Type-safe database access
- 📝 **TypeScript** - Full type safety
- ✔️ **Zod Validation** - Runtime type checking and validation
- 🎯 **Clean Architecture** - Layered separation of concerns
- 🚨 **Consistent Error Handling** - Meaningful HTTP status codes

## Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set up Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanager?schema=public"
JWT_SECRET="your-secret-key-change-this-in-production"
PORT=5000
NODE_ENV=development
```

### 3. Set up Database

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

## Project Structure

```
backend/
├── src/
│   ├── dto/                   # Data Transfer Objects (Zod schemas)
│   ├── repositories/          # Data Access Layer
│   ├── services/              # Business Logic Layer
│   ├── controllers/           # HTTP Request Handlers
│   ├── middleware/            # Auth, Validation, Error handling
│   ├── routes/                # API Routes
│   └── config/                # Configuration
```

## API Documentation

### Error Handling

Consistent HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

### Validation

All endpoints use Zod schemas for automatic validation with detailed error messages.

## Best Practices Implemented

✅ **Layered Architecture** - Clear separation (Controllers → Services → Repositories)  
✅ **DTOs with Validation** - Zod schemas for all inputs  
✅ **Error Handling** - Consistent status codes and error messages  
✅ **Type Safety** - Full TypeScript coverage  
✅ **Security** - Password hashing, JWT authentication  
✅ **Code Organization** - Modular structure with single responsibility
