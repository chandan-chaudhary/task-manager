# Settings Page Update - Implementation Summary

## Overview

The settings page has been simplified to only show fields that exist in the User schema, with a separate section added for changing passwords.

## Changes Made

### Frontend Changes

#### 1. Updated Settings Page (`frontend/app/settings/page.tsx`)

- **Removed sections:**

  - Avatar URL field (not in schema)
  - Notification Settings
  - Appearance Settings
  - Two-Factor Authentication

- **Kept sections:**

  - **Profile Update:** Only the name field (matches User schema)
  - **Change Password:** New dedicated section with:
    - Current Password field
    - New Password field (with validation)
    - Confirm Password field

- **Form validation:**
  - Name: 2-50 characters
  - New Password: Minimum 8 characters with uppercase, lowercase, and number
  - Password confirmation match validation

#### 2. Updated Validation Schema (`frontend/lib/validation.ts`)

- Removed `avatarUrl` field from `updateProfileSchema`
- Profile schema now only includes `name` field

#### 3. Updated API Service (`frontend/services/api.ts`)

- Added `changePassword` method to `authService`
- Endpoint: `PUT /api/auth/change-password`
- Accepts: `{ currentPassword, newPassword }`

### Backend Changes

#### 1. Auth DTO (`backend/src/dto/auth.dto.ts`)

- Added `changePasswordSchema` validation:
  ```typescript
  {
    currentPassword: string (required),
    newPassword: string (min 8 chars, uppercase, lowercase, number)
  }
  ```
- Exported `ChangePasswordDto` type

#### 2. User Repository (`backend/src/repositories/userRepository.ts`)

- Added `findByIdWithPassword` method to retrieve user with password field
- Original `findById` method excludes password for security

#### 3. Auth Service (`backend/src/services/authService.ts`)

- Added `changePassword` method:
  - Validates current password
  - Hashes new password with bcrypt
  - Updates password in database
  - Returns success message

#### 4. Auth Controller (`backend/src/controllers/authController.ts`)

- Added `changePassword` endpoint handler
- Protected with authentication middleware
- Returns success/error response

#### 5. Auth Routes (`backend/src/routes/authRoutes.ts`)

- Added new route:
  ```typescript
  PUT /api/auth/change-password
  - Middleware: authMiddleware, validate(changePasswordSchema)
  - Handler: authController.changePassword
  ```

## User Schema Reference

According to `prisma/schema.prisma`, the User model has:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Updatable fields:**

- `name` - via profile update
- `password` - via change password endpoint

**Read-only fields:**

- `email` - shown but not editable
- `id`, `createdAt`, `updatedAt` - system managed

## API Endpoints

### Update Profile

```
PATCH /api/users/:id
Headers: Cookie (with JWT token)
Body: { name: string }
```

### Change Password

```
PUT /api/auth/change-password
Headers: Cookie (with JWT token)
Body: {
  currentPassword: string,
  newPassword: string
}
```

## Security Features

1. **Authentication Required:** Both endpoints require valid JWT token
2. **Current Password Verification:** Must provide correct current password
3. **Password Hashing:** bcrypt with 10 salt rounds
4. **Strong Password Policy:**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number

## User Flow

### Profile Update

1. User modifies name in profile section
2. Clicks "Save Changes"
3. Request sent to backend
4. Success toast shown
5. Profile updated in auth context

### Password Change

1. User enters current password
2. User enters new password (meets requirements)
3. User confirms new password
4. Clicks "Change Password"
5. Backend validates current password
6. New password hashed and saved
7. Success toast shown
8. Form reset

## Testing Checklist

- [ ] Profile name update works
- [ ] Name validation (2-50 characters) enforced
- [ ] Password change with correct current password succeeds
- [ ] Password change with incorrect current password fails
- [ ] New password validation enforced (8 chars, uppercase, lowercase, number)
- [ ] Password confirmation mismatch shows error
- [ ] Success toasts display correctly
- [ ] Error messages display for validation failures
- [ ] Form resets after successful password change
- [ ] Avatar continues to display (from dicebear)
- [ ] Email shown as read-only

## Files Modified

### Backend (6 files)

1. `/backend/src/dto/auth.dto.ts` - Added change password DTO
2. `/backend/src/repositories/userRepository.ts` - Added findByIdWithPassword
3. `/backend/src/services/authService.ts` - Added changePassword method
4. `/backend/src/controllers/authController.ts` - Added changePassword handler
5. `/backend/src/routes/authRoutes.ts` - Added change-password route

### Frontend (3 files)

1. `/frontend/app/settings/page.tsx` - Simplified to name + password sections
2. `/frontend/lib/validation.ts` - Removed avatarUrl from profile schema
3. `/frontend/services/api.ts` - Added changePassword API method
