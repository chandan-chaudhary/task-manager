# Task Manager Backend

A robust RESTful API server for the Task Manager application built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL. Features real-time notifications via Socket.io, JWT authentication, and clean layered architecture following industry best practices.

## Features

- 🔐 **JWT Authentication** - Secure token-based auth with HTTP-only cookies
- 👥 **User Management** - Complete CRUD operations with role-based authorization
- ✅ **Task Management** - Full task lifecycle management with priorities, statuses, and deadlines
- 🔔 **Real-time Notifications** - Live task assignment and update notifications via Socket.io
- 🗄️ **PostgreSQL with Prisma ORM** - Type-safe database access and migrations
- 📝 **TypeScript** - Full type safety throughout the application
- ✔️ **Zod Validation** - Runtime type checking and request validation
- 🎯 **Clean Architecture** - Layered separation of concerns (Controllers → Services → Repositories)
- 🚨 **Consistent Error Handling** - Meaningful HTTP status codes and error messages
- 📊 **Dashboard Statistics** - Real-time task analytics and metrics

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Real-time**: Socket.io
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware
- **Development**: Nodemon, ts-node

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database server running
- npm package manager

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanager?schema=public"

# JWT Secret Key (CHANGE THIS IN PRODUCTION!)
JWT_SECRET="your-secret-key-change-this-in-production"

# Server Configuration
PORT=8080
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

### Environment Variable Details

- `DATABASE_URL`: PostgreSQL connection string. Format: `postgresql://[user]:[password]@[host]:[port]/[database]?schema=public`
- `JWT_SECRET`: Secret key for signing JWT tokens. **Must be changed in production** to a strong random string
- `PORT`: Port number for the API server (default: 5000)
- `NODE_ENV`: Environment mode (`development` or `production`)
- `FRONTEND_URL`: Frontend application URL for CORS configuration (default: http://localhost:3000)

**Note**: You can copy `.env.example` to `.env` and modify the values:

```bash
cp .env.example .env
```

## Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create your `.env` file with the required environment variables (see above)

4. Set up the database:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

## Getting Started

### Development Mode

Start the development server with auto-reload:

```bash
npm run dev
```

The API will be available at `http://localhost:8080/api`

### Production Build

1. Build the TypeScript code:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

## Database Management

### Run Migrations

Apply pending migrations to your database:

```bash
npx prisma migrate dev
```

### Reset Database

Reset the database (WARNING: This will delete all data):

```bash
npx prisma migrate reset
```

### Prisma Studio

Open Prisma Studio to visually manage your database:

```bash
npx prisma studio
```

### Generate Prisma Client

Regenerate Prisma Client after schema changes:

```bash
npx prisma generate
```

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

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── src/
│   ├── controllers/           # HTTP request handlers
│   │   ├── authController.ts
│   │   ├── taskController.ts
│   │   ├── userController.ts
│   │   └── notificationController.ts
│   ├── services/              # Business logic layer
│   │   ├── authService.ts
│   │   ├── taskService.ts
│   │   ├── userService.ts
│   │   └── notificationService.ts
│   ├── repositories/          # Data access layer
│   │   ├── taskRepository.ts
│   │   ├── userRepository.ts
│   │   └── notificationRepository.ts
│   ├── dto/                   # Data Transfer Objects (Zod schemas)
│   │   ├── auth.dto.ts
│   │   ├── task.dto.ts
│   │   ├── user.dto.ts
│   │   └── notification.dto.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts           # JWT authentication
│   │   ├── validation.ts     # Zod validation
│   │   └── errorHandler.ts   # Global error handling
│   ├── routes/                # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── taskRoutes.ts
│   │   ├── userRoutes.ts
│   │   └── notificationRoutes.ts
│   ├── config/                # Configuration files
│   │   ├── database.ts       # Prisma client
│   │   └── socket.ts         # Socket.io setup
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
├── rest-client/               # HTTP request examples
│   ├── auth.http
│   ├── task.http
│   ├── user.http
│   └── notification.http
├── .env                       # Environment variables (create this)
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
└── nodemon.json
```


## Error Handling

Consistent HTTP status codes across all endpoints:

- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `204` - No Content (DELETE)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error