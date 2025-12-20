# Task Manager Frontend

A modern, real-time task management application built with Next.js 16, featuring real-time notifications via Socket.io, comprehensive task management capabilities, and a beautiful UI powered by shadcn/ui and Tailwind CSS.

## Features

- **Authentication & Authorization**: Secure user authentication with JWT tokens
- **Real-time Updates**: Live notifications and task updates using Socket.io
- **Task Management**: Create, update, delete, and organize tasks with priorities and deadlines
- **Dashboard**: Overview of task statistics including total, completed, and overdue tasks
- **Team Collaboration**: View team members and their tasks
- **Responsive Design**: Fully responsive UI that works on all devices
- **Form Validation**: Client-side validation using Zod and React Hook Form
- **Modern UI Components**: Built with Radix UI primitives and shadcn/ui

## Prerequisites

- Node.js 18+ installed
- Backend API server running (see backend README)
- npm package manager

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Environment Variable Details

- `NEXT_PUBLIC_API_URL`: The base URL of your backend API server (default: `http://localhost:8080/api`)

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create your `.env.local` file with the required environment variables (see above)

## Getting Started

### Development Mode

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The page auto-updates as you edit files. Start by modifying files in the `app/` directory.

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Application Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── tasks/             # Task management pages
│   ├── team/              # Team overview page
│   ├── settings/          # User settings page
│   └── _components/       # Shared layout components
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication context
│   └── SocketContext.tsx # Socket.io context
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── services/             # API service layer
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Available Pages

- `/` - Home (redirects to dashboard or login)
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard with task overview
- `/tasks` - Task list and management
- `/tasks/[id]` - Individual task details
- `/team` - Team members view
- `/settings` - User settings
