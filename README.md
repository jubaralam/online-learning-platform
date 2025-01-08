# online-learning-platform


# User Routes Documentation

This document explains the API endpoints for user registration, login, profile management, and other user-related operations. These routes are implemented using Express.js and MongoDB via Mongoose.

## Base URL
All routes are prefixed with `/api/user`.

---

## 1. **User Registration**
### Endpoint
`POST /api/user/register`

### Description
Registers a new user in the system.

### Request Body
```json
{
  "name": "string",
  "email": "string",
  "phone_no": "number",
  "password": "string"
}
```

### Response
- **201 Created**: Registration successful.
  ```json
  {
    "message": "you have registered"
  }
  ```
- **200 OK**: User already registered.
  ```json
  {
    "message": "you are already registered, please login"
  }
  ```
- **500 Internal Server Error**: On any unexpected error.

---

## 2. **User Login**
### Endpoint
`POST /api/user/login`

### Description
Logs in an existing user and returns a JWT token.

### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

### Response
- **201 Created**: Login successful.
  ```json
  {
    "message": "you have logged in successfully",
    "token": "string"
  }
  ```
- **200 OK**: Email not found.
  ```json
  {
    "message": "email not found"
  }
  ```
- **500 Internal Server Error**: On any unexpected error.

---

## 3. **Update User Profile**
### Endpoint
`PUT /api/user/update/:id`

### Description
Updates user profile information based on the provided `id`.

### Request Parameters
- `id` (string): The user ID.

### Request Body (Optional Fields)
```json
{
  "name": "string",
  "email": "string",
  "phone_no": "number"
}
```

### Response
- **201 Created**: Profile updated successfully.
  ```json
  {
    "message": "your profile has updated",
    "data": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "phone_no": "number",
      "role": "string"
    }
  }
  ```
- **500 Internal Server Error**: On any unexpected error.

---

## 4. **Get User by ID**
### Endpoint
`GET /api/user/:id`

### Description
Fetches a single user by their `id`.

### Request Parameters
- `id` (string): The user ID.

### Response
- **201 Created**: User found successfully.
  ```json
  {
    "data": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "phone_no": "number",
      "role": "string"
    }
  }
  ```
- **500 Internal Server Error**: On any unexpected error.

---

## 5. **Get All Users**
### Endpoint
`GET /api/user/`

### Description
Fetches all users in the system.

### Response
- **201 Created**: Users fetched successfully.
  ```json
  {
    "data": [
      {
        "_id": "string",
        "name": "string",
        "email": "string",
        "phone_no": "number",
        "role": "string"
      }
    ]
  }
  ```
- **500 Internal Server Error**: On any unexpected error.

---

## 6. **Delete User**
### Endpoint
`DELETE /api/user/remove/:id`

### Description
Deletes a user account based on the provided `id`.

### Request Parameters
- `id` (string): The user ID.

### Response
- **200 OK**: Account deleted successfully.
  ```json
  {
    "message": "your account has been deleted"
  }
  ```
- **500 Internal Server Error**: On any unexpected error.

---

## Notes for Frontend Developers
1. **JWT Token**:
   - After login, store the `token` securely (e.g., in localStorage or cookies).
   - Include the token in the `Authorization` header for any authenticated routes.
     ```json
     Authorization: Bearer <token>
     ```

2. **Validation**:
   - Ensure all required fields are validated before sending requests.
   - Handle errors based on the response codes and messages.

3. **User Roles**:
   - The `role` field defaults to `"learner"`. If role-specific logic is required, extend the backend logic to handle roles.

4. **UI Recommendations**:
   - Provide appropriate feedback to users for successful and failed operations.
   - Implement input sanitization and validation for email and phone number fields.

---



