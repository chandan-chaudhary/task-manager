module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sonner.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/tooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const TooltipProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"];
const Tooltip = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const TooltipTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const TooltipContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/components/ui/tooltip.tsx",
            lineNumber: 19,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TooltipContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
;
}),
"[project]/types/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Core type definitions for the Task Manager application.
 * These types mirror the backend models for type safety across the stack.
 */ /** Priority levels for tasks */ __turbopack_context__.s([
    "PriorityEnum",
    ()=>PriorityEnum,
    "TaskStatusEnum",
    ()=>TaskStatusEnum,
    "getPriorityKey",
    ()=>getPriorityKey,
    "getTaskStatusKey",
    ()=>getTaskStatusKey
]);
var TaskStatusEnum = /*#__PURE__*/ function(TaskStatusEnum) {
    TaskStatusEnum["TODO"] = "To Do";
    TaskStatusEnum["IN_PROGRESS"] = "In Progress";
    TaskStatusEnum["REVIEW"] = "Review";
    TaskStatusEnum["COMPLETED"] = "Completed";
    return TaskStatusEnum;
}({});
var PriorityEnum = /*#__PURE__*/ function(PriorityEnum) {
    PriorityEnum["LOW"] = "Low";
    PriorityEnum["MEDIUM"] = "Medium";
    PriorityEnum["HIGH"] = "High";
    PriorityEnum["URGENT"] = "Urgent";
    return PriorityEnum;
}({});
function getTaskStatusKey(value) {
    return Object.keys(TaskStatusEnum).find((key)=>TaskStatusEnum[key] === value) || "TODO";
}
function getPriorityKey(value) {
    return Object.keys(PriorityEnum).find((key)=>PriorityEnum[key] === value) || "MEDIUM";
}
}),
"[project]/services/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-unused-vars */ __turbopack_context__.s([
    "authService",
    ()=>authService,
    "dashboardService",
    ()=>dashboardService,
    "notificationService",
    ()=>notificationService,
    "taskService",
    ()=>taskService,
    "userService",
    ()=>userService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/types/index.ts [app-ssr] (ecmascript)");
;
/**
 * API service layer for backend communication.
 * Currently uses mock data - replace implementations with actual API calls.
 *
 * @example
 * // When connecting to backend, replace:
 * // return mockTasks;
 * // with:
 * // const response = await fetch(`${API_BASE_URL}/tasks`);
 * // return response.json();
 */ // Configure your backend URL here when connecting
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080/api") || "http://localhost:8080/api";
/** Create headers for API requests */ const createHeaders = ()=>{
    return {
        "Content-Type": "application/json"
    };
};
const authService = {
    /**
   * Authenticate user with email and password.
   * Backend: POST /api/auth/login
   */ async login (credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(credentials)
            });
            console.log(response);
            const result = await response.json();
            if (!response.ok) {
                return {
                    error: result.message || "Login failed"
                };
            }
            const backendUser = result.data.user;
            return {
                data: {
                    user: {
                        ...backendUser,
                        id: String(backendUser.id),
                        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`
                    },
                    token: ""
                }
            };
        } catch (_error) {
            return {
                error: "Network error. Please try again."
            };
        }
    },
    /**
   * Register a new user account.
   * Backend: POST /api/auth/register
   */ async register (data) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            });
            const result = await response.json();
            if (!response.ok) {
                return {
                    error: result.message || "Registration failed"
                };
            }
            const backendUser = result.data.user;
            return {
                data: {
                    user: {
                        ...backendUser,
                        id: String(backendUser.id),
                        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`
                    },
                    token: ""
                }
            };
        } catch (_error) {
            return {
                error: "Network error. Please try again."
            };
        }
    },
    /**
   * Get current authenticated user.
   * Backend: GET /api/auth/me
   */ async getCurrentUser () {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to fetch user data"
                };
            }
            const result = await response.json();
            const backendUser = result.data.user;
            const user = {
                ...backendUser,
                id: String(backendUser.id),
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`
            };
            return {
                data: user
            };
        } catch (_error) {
            return {
                error: "Failed to fetch user data"
            };
        }
    },
    /**
   * Logout current user.
   * Backend: POST /api/auth/logout
   */ async logout () {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                return {
                    error: "Logout failed"
                };
            }
            return {
                message: "Logged out successfully"
            };
        } catch (_error) {
            return {
                error: "Logout failed"
            };
        }
    },
    /**
   * Update user profile.
   * Backend: PATCH /api/users/:id
   */ async updateProfile (userId, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: "PATCH",
                headers: createHeaders(),
                credentials: "include",
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to update profile"
                };
            }
            const result = await response.json();
            const backendUser = result.data.user;
            const user = {
                ...backendUser,
                id: String(backendUser.id),
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`
            };
            return {
                data: user
            };
        } catch (_error) {
            return {
                error: "Failed to update profile"
            };
        }
    }
};
const taskService = {
    /**
   * Get all tasks with optional filters and sorting.
   * Backend: GET /api/tasks
   */ async getTasks (filters, sort) {
        try {
            const params = new URLSearchParams();
            // Add filters as query params (convert to backend format using enum keys)
            if (filters) {
                if (filters.status && filters.status !== "all") {
                    params.append("status", (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTaskStatusKey"])(filters.status));
                }
                if (filters.priority && filters.priority !== "all") {
                    params.append("priority", (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPriorityKey"])(filters.priority));
                }
                if (filters.assignedToMe) {
                    params.append("assignedToMe", "true");
                }
                if (filters.createdByMe) {
                    params.append("createdByMe", "true");
                }
                if (filters.overdue) {
                    params.append("overdue", "true");
                }
            }
            // Add sorting
            if (sort) {
                params.append("sortBy", sort.field);
                params.append("sortOrder", sort.direction);
            }
            const url = `${API_BASE_URL}/tasks${params.toString() ? `?${params.toString()}` : ""}`;
            const response = await fetch(url, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to fetch tasks"
                };
            }
            const result = await response.json();
            const tasks = result.data.tasks.map((task)=>({
                    ...task,
                    id: String(task.id),
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskStatusEnum"][task.status] || task.status,
                    priority: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PriorityEnum"][task.priority] || task.priority,
                    creatorId: task.creatorId ? String(task.creatorId) : undefined,
                    assignedToId: task.assignedToId ? String(task.assignedToId) : null,
                    creator: task.creator ? {
                        ...task.creator,
                        id: String(task.creator.id)
                    } : undefined,
                    assignedTo: task.assignedTo ? {
                        ...task.assignedTo,
                        id: String(task.assignedTo.id)
                    } : null
                }));
            return {
                data: tasks
            };
        } catch (_error) {
            return {
                error: "Failed to fetch tasks"
            };
        }
    },
    /**
   * Get a single task by ID.
   * Backend: GET /api/tasks/:id
   */ async getTask (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Task not found"
                };
            }
            const result = await response.json();
            const backendTask = result.data.task;
            const task = {
                ...backendTask,
                id: String(backendTask.id),
                status: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskStatusEnum"][backendTask.status] || backendTask.status,
                priority: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PriorityEnum"][backendTask.priority] || backendTask.priority,
                creatorId: backendTask.creatorId ? String(backendTask.creatorId) : "",
                assignedToId: backendTask.assignedToId ? String(backendTask.assignedToId) : null
            };
            return {
                data: task
            };
        } catch (_error) {
            return {
                error: "Failed to fetch task"
            };
        }
    },
    /**
   * Create a new task.
   * Backend: POST /api/tasks
   */ async createTask (data) {
        try {
            // Convert frontend format to backend format
            const backendData = {
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTaskStatusKey"])(data.status),
                priority: (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPriorityKey"])(data.priority),
                assignedToId: data.assignedToId ? parseInt(data.assignedToId) : undefined
            };
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: "POST",
                headers: createHeaders(),
                credentials: "include",
                body: JSON.stringify(backendData)
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to create task"
                };
            }
            const result = await response.json();
            const backendTask = result.data.task;
            const task = {
                ...backendTask,
                id: String(backendTask.id),
                status: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskStatusEnum"][backendTask.status] || backendTask.status,
                priority: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PriorityEnum"][backendTask.priority] || backendTask.priority,
                creatorId: String(backendTask.creatorId),
                assignedToId: backendTask.assignedToId ? String(backendTask.assignedToId) : null
            };
            return {
                data: task
            };
        } catch (_error) {
            return {
                error: "Failed to create task"
            };
        }
    },
    /**
   * Update an existing task.
   * Backend: PATCH /api/tasks/:id
   */ async updateTask (id, data) {
        try {
            // Convert frontend format to backend format
            const backendData = {};
            if (data.title !== undefined) backendData.title = data.title;
            if (data.description !== undefined) backendData.description = data.description;
            if (data.dueDate !== undefined) backendData.dueDate = data.dueDate;
            if (data.status !== undefined) backendData.status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTaskStatusKey"])(data.status);
            if (data.priority !== undefined) backendData.priority = (0, __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPriorityKey"])(data.priority);
            if (data.assignedToId !== undefined) {
                backendData.assignedToId = data.assignedToId ? parseInt(data.assignedToId) : null;
            }
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: "PATCH",
                headers: createHeaders(),
                credentials: "include",
                body: JSON.stringify(backendData)
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to update task"
                };
            }
            const result = await response.json();
            const backendTask = result.data.task;
            const task = {
                ...backendTask,
                id: String(backendTask.id),
                status: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskStatusEnum"][backendTask.status] || backendTask.status,
                priority: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PriorityEnum"][backendTask.priority] || backendTask.priority,
                creatorId: String(backendTask.creatorId),
                assignedToId: backendTask.assignedToId ? String(backendTask.assignedToId) : null
            };
            return {
                data: task
            };
        } catch (_error) {
            return {
                error: "Failed to update task"
            };
        }
    },
    /**
   * Delete a task.
   * Backend: DELETE /api/tasks/:id
   */ async deleteTask (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: "DELETE",
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const result = await response.json();
                return {
                    error: result.message || "Failed to delete task"
                };
            }
            return {
                message: "Task deleted successfully"
            };
        } catch (_error) {
            return {
                error: "Failed to delete task"
            };
        }
    }
};
const userService = {
    /**
   * Get all users (for task assignment dropdown).
   * Backend: GET /api/users
   */ async getUsers () {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to fetch users"
                };
            }
            const result = await response.json();
            const users = result.data.users.map((user)=>({
                    ...user,
                    id: String(user.id),
                    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
                }));
            return {
                data: users
            };
        } catch (_error) {
            return {
                error: "Failed to fetch users"
            };
        }
    },
    /**
   * Get user by ID.
   * Backend: GET /api/users/:id
   */ async getUser (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "User not found"
                };
            }
            const result = await response.json();
            const backendUser = result.data.user;
            const user = {
                ...backendUser,
                id: String(backendUser.id),
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`
            };
            return {
                data: user
            };
        } catch (_error) {
            return {
                error: "Failed to fetch user"
            };
        }
    },
    /**
   * Update user.
   * Backend: PATCH /api/users/:id
   */ async updateUser (id, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: "PATCH",
                headers: createHeaders(),
                credentials: "include",
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to update user"
                };
            }
            const result = await response.json();
            const backendUser = result.data.user;
            const user = {
                ...backendUser,
                id: String(backendUser.id),
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`
            };
            return {
                data: user
            };
        } catch (_error) {
            return {
                error: "Failed to update user"
            };
        }
    },
    /**
   * Delete user.
   * Backend: DELETE /api/users/:id
   */ async deleteUser (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: "DELETE",
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const result = await response.json();
                return {
                    error: result.message || "Failed to delete user"
                };
            }
            return {
                message: "User deleted successfully"
            };
        } catch (_error) {
            return {
                error: "Failed to delete user"
            };
        }
    }
};
const notificationService = {
    /**
   * Get all notifications for current user.
   * Backend: GET /api/notifications
   */ async getNotifications () {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to fetch notifications"
                };
            }
            const result = await response.json();
            const notifications = result.data.notifications.map((n)=>({
                    ...n,
                    id: String(n.id),
                    userId: n.userId ? String(n.userId) : undefined,
                    taskId: n.taskId ? String(n.taskId) : undefined,
                    read: n.isRead
                }));
            return {
                data: notifications
            };
        } catch (_error) {
            return {
                error: "Failed to fetch notifications"
            };
        }
    },
    /**
   * Get unread notification count.
   * Backend: GET /api/notifications/unread-count
   */ async getUnreadCount () {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/unread-count`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to fetch unread count"
                };
            }
            const result = await response.json();
            return {
                data: result.data
            };
        } catch (_error) {
            return {
                error: "Failed to fetch unread count"
            };
        }
    },
    /**
   * Get notification by ID.
   * Backend: GET /api/notifications/:id
   */ async getNotification (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Notification not found"
                };
            }
            const result = await response.json();
            const n = result.data.notification;
            const notification = {
                ...n,
                id: String(n.id),
                userId: n.userId ? String(n.userId) : undefined,
                taskId: n.taskId ? String(n.taskId) : undefined,
                read: n.isRead
            };
            return {
                data: notification
            };
        } catch (_error) {
            return {
                error: "Failed to fetch notification"
            };
        }
    },
    /**
   * Mark notification as read.
   * Backend: PATCH /api/notifications/:id/read
   */ async markAsRead (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
                method: "PATCH",
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to mark as read"
                };
            }
            const result = await response.json();
            const n = result.data.notification;
            const notification = {
                ...n,
                id: String(n.id),
                userId: n.userId ? String(n.userId) : undefined,
                taskId: n.taskId ? String(n.taskId) : undefined,
                read: n.isRead
            };
            return {
                data: notification
            };
        } catch (_error) {
            return {
                error: "Failed to mark notification as read"
            };
        }
    },
    /**
   * Mark all notifications as read.
   * Backend: PATCH /api/notifications/mark-all-read
   */ async markAllAsRead () {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
                method: "PATCH",
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const result = await response.json();
                return {
                    error: result.message || "Failed to mark all as read"
                };
            }
            return {
                message: "All notifications marked as read"
            };
        } catch (_error) {
            return {
                error: "Failed to mark all notifications as read"
            };
        }
    },
    /**
   * Delete notification.
   * Backend: DELETE /api/notifications/:id
   */ async deleteNotification (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
                method: "DELETE",
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const result = await response.json();
                return {
                    error: result.message || "Failed to delete notification"
                };
            }
            return {
                message: "Notification deleted successfully"
            };
        } catch (_error) {
            return {
                error: "Failed to delete notification"
            };
        }
    }
};
const dashboardService = {
    /**
   * Get dashboard statistics.
   * Backend: GET /api/tasks/stats
   */ async getStats () {
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/stats`, {
                headers: createHeaders(),
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                return {
                    error: error.message || "Failed to fetch stats"
                };
            }
            const result = await response.json();
            return {
                data: result.data.stats
            };
        } catch (_error) {
            return {
                error: "Failed to fetch dashboard stats"
            };
        }
    }
};
}),
"[project]/hooks/use-toast.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
;
}),
"[project]/context/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    // Check for existing session on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            // Try to get current user - cookie will be sent automatically
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
            if (response.data) {
                setUser(response.data);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (credentials)=>{
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login(credentials);
            console.log(response);
            if (response.error) {
                toast({
                    title: "Login failed",
                    description: response.error,
                    variant: "destructive"
                });
                return false;
            }
            if (response.data) {
                setUser(response.data.user);
                toast({
                    title: "Welcome back!",
                    description: `Logged in as ${response.data.user.name}`
                });
                return true;
            }
            return false;
        } finally{
            setIsLoading(false);
        }
    }, [
        toast
    ]);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].register(data);
            if (response.error) {
                toast({
                    title: "Registration failed",
                    description: response.error,
                    variant: "destructive"
                });
                return false;
            }
            if (response.data) {
                setUser(response.data.user);
                toast({
                    title: "Account created!",
                    description: "Welcome to TaskFlow"
                });
                return true;
            }
            return false;
        } finally{
            setIsLoading(false);
        }
    }, [
        toast
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
        setUser(null);
        toast({
            title: "Logged out",
            description: "See you next time!"
        });
    }, [
        toast
    ]);
    const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        if (!user) return false;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].updateProfile(user.id, data);
        if (response.error) {
            toast({
                title: "Update failed",
                description: response.error,
                variant: "destructive"
            });
            return false;
        }
        if (response.data) {
            setUser(response.data);
            toast({
                title: "Profile updated",
                description: "Your changes have been saved"
            });
            return true;
        }
        return false;
    }, [
        user,
        toast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            register,
            logout,
            updateProfile
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AuthContext.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[project]/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/sonner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function Providers({ children }) {
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    retry: 1
                }
            }
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                    children: [
                        children,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {}, void 0, false, {
                            fileName: "[project]/app/providers.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/providers.tsx",
                    lineNumber: 27,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/providers.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/providers.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__473f6061._.js.map