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



# Course API Routes Documentation

## Base URL
`/api/courses`

---

## Routes

### 1. Create a New Course
**Endpoint:** `POST /create`

**Middleware:**
- `auth`
- `authorizeInstructorOrAdmin`

**Description:** Allows an authenticated instructor or admin to create a new course.

**Request Body:**
```json
{
  "poster": "string (URL)",
  "title": "string",
  "description": "string",
  "mode": "string (e.g., Online or Offline)",
  "language": "string",
  "price": "number",
  "discount_price": "number",
  "total_content": "number",
  "course_duration": "number (in weeks)"
}
```

**Response:**
- **Success (200):**
```json
{
  "message": "new course has been added"
}
```
- **Error (500):**
```json
{
  "error": "error message"
}
```

---

### 2. Get Course by ID
**Endpoint:** `GET /:id`

**Description:** Retrieves a specific course by its ID.

**Path Parameters:**
- `id` (string): ID of the course to retrieve.

**Response:**
- **Success (201):**
```json
{
  "data": { "course details object" }
}
```
- **Error (500):**
```json
{
  "error": "error message"
}
```

---

### 3. Get All Courses
**Endpoint:** `GET /`

**Description:** Retrieves all courses available in the database.

**Response:**
- **Success (200):**
```json
{
  "data": [
    { "course details object" },
    { "course details object" }
  ]
}
```
- **Error (500):**
```json
{
  "message": "error message"
}
```

---

### 4. Update Course
**Endpoint:** `PUT /update/:id`

**Middleware:**
- `auth`
- `authorizeInstructorOrAdmin`

**Description:** Allows an authenticated instructor or admin to update a course.

**Path Parameters:**
- `id` (string): ID of the course to update.

**Request Body:**
```json
{
  "poster": "string (optional)",
  "title": "string (optional)",
  "description": "string (optional)",
  "mode": "string (optional)",
  "language": "string (optional)",
  "price": "number (optional)",
  "discount_price": "number (optional)",
  "total_content": "number (optional)",
  "course_duration": "number (optional)"
}
```

**Response:**
- **Success (200):**
```json
{
  "message": "course has updated",
  "data": { "updated course object" }
}
```
- **Error (500):**
```json
{
  "error": "error message"
}
```

---

### 5. Delete Course
**Endpoint:** `DELETE /delete/:id`

**Middleware:**
- `auth`
- `authorizeInstructorOrAdmin`

**Description:** Allows an authenticated instructor or admin to delete a course.

**Path Parameters:**
- `id` (string): ID of the course to delete.

**Response:**
- **Success:**
```json
{
  "message": "course has been deleted"
}
```
- **Error (404):**
```json
{
  "message": "course detail not found"
}
```
- **Error (500):**
```json
{
  "error": "error message"
}
```

---

## Error Codes
- **401 Unauthorized:** User does not have the required permissions.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** An error occurred on the server.

## Middleware Used
1. **auth:** Validates the JWT token provided in the `Authorization` header.
2. **authorizeInstructorOrAdmin:** Ensures the user has the role of `instructor` or `admin`.



# Course Module API Documentation

## Base URL: `/api/course-module`

### Middleware
- **auth**: Ensures that the user is authenticated.
- **authorizeInstructorOrAdmin**: Ensures that the user has instructor or admin privileges.

---

## Endpoints

### 1. **Create a Course Module**
#### **POST** `/create`

This endpoint allows authorized instructors or admins to create a new course module.

#### Request Headers
- `Authorization`: Bearer `<token>`

#### Request Body
```json
{
  "course_Id": "<course_id>",
  "title": "<module_title>",
  "content": ["<content1>", "<content2>", ...],
  "video_link": "<video_link_url>"
}
```

#### Response
- **201**: Module created successfully.
  ```json
  {
    "message": "course content has been created"
  }
  ```
- **400**: Missing required fields.
  ```json
  {
    "message": "All fields are required"
  }
  ```
- **500**: Server error.
  ```json
  {
    "message": "<error_message>"
  }
  ```

---

### 2. **Get Modules by Course ID**
#### **GET** `/:courseId`

This endpoint retrieves all modules related to a specific course.

#### URL Parameters
- `courseId`: The ID of the course.

#### Response
- **200**: Modules retrieved successfully.
  ```json
  {
    "data": [
      {
        "_id": "<module_id>",
        "course_Id": "<course_id>",
        "instructor_Id": "<instructor_id>",
        "title": "<module_title>",
        "content": ["<content1>", "<content2>", ...],
        "video_link": "<video_link_url>"
      }
    ]
  }
  ```
- **404**: No modules found.
  ```json
  {
    "message": "module not found"
  }
  ```
- **500**: Server error.
  ```json
  {
    "error": "<error_message>"
  }
  ```

---

### 3. **Update a Module**
#### **PUT** `/update/:moduleId`

This endpoint allows authorized instructors or admins to update a course module.

#### URL Parameters
- `moduleId`: The ID of the module to update.

#### Request Headers
- `Authorization`: Bearer `<token>`

#### Request Body
At least one of the following fields must be provided:
```json
{
  "title": "<new_title>",
  "content": ["<updated_content1>", "<updated_content2>", ...],
  "video_link": "<new_video_link_url>"
}
```

#### Response
- **200**: Module updated successfully.
  ```json
  {
    "message": "module has updated",
    "data": {
      "_id": "<module_id>",
      "course_Id": "<course_id>",
      "instructor_Id": "<instructor_id>",
      "title": "<updated_title>",
      "content": ["<updated_content1>", "<updated_content2>", ...],
      "video_link": "<updated_video_link_url>"
    }
  }
  ```
- **403**: User not authorized to update the module.
  ```json
  {
    "message": "you are not authorized"
  }
  ```
- **404**: Module not found or update failed.
  ```json
  {
    "message": "something went wrong"
  }
  ```
- **500**: Server error.
  ```json
  {
    "error": "<error_message>"
  }
  ```

---

### 4. **Delete a Module**
#### **DELETE** `/delete/:moduleId`

This endpoint allows authorized instructors or admins to delete a course module.

#### URL Parameters
- `moduleId`: The ID of the module to delete.

#### Request Headers
- `Authorization`: Bearer `<token>`

#### Response
- **204**: Module deleted successfully.
- **403**: User not authorized to delete the module.
  ```json
  {
    "message": "you are not authorized"
  }
  ```
- **404**: Module not found or deletion failed.
  ```json
  {
    "message": "something went wrong"
  }
  ```
- **500**: Server error.
  ```json
  {
    "error": "<error_message>"
  }
  ```

---

## Schema

### Course Module Schema
```json
{
  "course_Id": {
    "type": "ObjectId",
    "required": true,
    "ref": "course"
  },
  "instructor_Id": {
    "type": "ObjectId",
    "required": true,
    "ref": "user"
  },
  "title": {
    "type": "String",
    "required": true
  },
  "content": {
    "type": "Array",
    "required": true
  },
  "video_link": {
    "type": "String",
    "required": true
  }
}
```




# Enrollment API Documentation

This documentation describes the endpoints available in the `enrollmentRouter` for managing course enrollments, payments, and retrieving course-related information.

---

## **POST /enroll**
### **Description:**
Enroll a learner in a course with payment details.

### **Request Body:**
```json
{
  "course_Id": "<course_id>",
  "amount": <amount>,
  "payment_method": "<payment_method>",
  "payment_Id": "<payment_id>",
  "gateway_transaction_Id": "<gateway_transaction_id>",
  "notes": "<notes>"
}
```
### **Response:**
- **201 Created:**
```json
{
  "message": "Enrollment and payment processed successfully.",
  "enrollment": { <enrollment_details> },
  "payment": { <payment_details> }
}
```
- **400 Bad Request:**
```json
{
  "error": "All required fields must be provided."
}
```
- **500 Internal Server Error:**
```json
{
  "error": "<error_message>"
}
```
---

## **GET /course-details/:courseId**
### **Description:**
Retrieve details of a specific course.

### **Parameters:**
- `courseId` (Path Parameter): ID of the course.

### **Response:**
- **200 OK:**
```json
{
  "data": { <course_details> }
}
```
- **404 Not Found:**
```json
{
  "message": "Course not found."
}
```
- **500 Internal Server Error:**
```json
{
  "error": "<error_message>"
}
```
---

## **GET /get-modules/:courseId**
### **Description:**
Retrieve all modules for a specific course.

### **Parameters:**
- `courseId` (Path Parameter): ID of the course.

### **Response:**
- **200 OK:**
```json
{
  "data": [ <module_details> ]
}
```
- **404 Not Found:**
```json
{
  "error": "Module not found."
}
```
- **500 Internal Server Error:**
```json
{
  "error": "<error_message>"
}
```
---

## **GET /get-payments/:learnerId**
### **Description:**
Retrieve all payments made by a specific learner.

### **Parameters:**
- `learnerId` (Path Parameter): ID of the learner.

### **Response:**
- **200 OK:**
```json
{
  "data": [ <payment_records> ]
}
```
- **200 No Content:**
```json
{
  "message": "No Payment Records found."
}
```
- **500 Internal Server Error:**
```json
{
  "error": "<error_message>"
}
```
---

## **GET /payment/:paymentId**
### **Description:**
Retrieve detailed information about a specific payment.

### **Parameters:**
- `paymentId` (Path Parameter): ID of the payment.

### **Response:**
- **200 OK:**
```json
{
  "data": { <payment_details> }
}
```
- **404 Not Found:**
```json
{
  "message": "Payment not found."
}
```
- **500 Internal Server Error:**
```json
{
  "error": "<error_message>"
}
```
---

## **GET /get-all-courses**
### **Description:**
Retrieve all courses a learner is enrolled in.

### **Response:**
- **200 OK:**
```json
{
  "data": [
    {
      "_id": "<enrollment_id>",
      "course_Id": "<course_id>",
      "course_details": { <course_data> },
      "enrollment_date": "<enrollment_date>",
      "progress_percentage": <progress_percentage>,
      "learner_Id": "<learner_id>"
    }
  ]
}
```
- **404 Not Found:**
```json
{
  "message": "Course not found."
}
```
- **500 Internal Server Error:**
```json
{
  "error": "<error_message>"
}
```
---

## **Models Used:**
### **EnrollmentModel:**
- `course_Id`
- `learner_Id`
- `status`
- `enrollment_date`
- `progress_percentage`

### **PaymentModel:**
- `payment_Id`
- `payment_status`
- `amount`
- `payment_method`
- `learner_Id`
- `enrollment_Id`
- `gateway_transaction_Id`
- `notes`

### **CourseModel:**
- `title`
- `description`
- `price`
- `language`
- `duration`

---



# Admin Router API Documentation

This documentation describes the API routes provided by the `adminRouter` for managing users, courses, and instructors. All routes are part of the admin module and are defined in `adminRouter`.

---

## User Routes bash user domain-name/api/admin

### 1. Get User by ID
**Endpoint**: `GET /user/:id`

**Description**: Fetches details of a user by their ID.

**Request Parameters**:
- `id` (Path): User's unique identifier.

**Responses**:
- `200`: Returns user data.
- `404`: User not found.
- `500`: Server error.

---

### 2. Update User Details
**Endpoint**: `PUT /user/update/:id`

**Description**: Updates the details of a user by their ID.

**Request Parameters**:
- `id` (Path): User's unique identifier.

**Request Body**:
- `name`, `email`, `phone_no`, `age`, `dob`, `gender`, `profile_picture`, `city`, `highest_qualification`, `preferred_language`, `learning_goals`, `role` (Optional): Updated user details.

**Responses**:
- `200`: Returns updated user data.
- `404`: User not found.
- `500`: Server error.

---

### 3. Get All Users
**Endpoint**: `GET /users`

**Description**: Fetches all users with the role of "learner."

**Responses**:
- `200`: Returns an array of users.
- `403`: Unauthorized access.
- `500`: Server error.

---

### 4. Delete User by ID
**Endpoint**: `DELETE /user/remove/:id`

**Description**: Deletes a user by their ID.

**Request Parameters**:
- `id` (Path): User's unique identifier.

**Responses**:
- `200`: Returns deleted user data.
- `404`: User not found.
- `500`: Server error.

---

### 5. Get All Instructors
**Endpoint**: `GET /instructors`

**Description**: Fetches all users with the role of "instructor."

**Responses**:
- `200`: Returns an array of instructors.
- `404`: No instructors found.
- `500`: Server error.

---

## Course Routes

### 1. Get All Courses
**Endpoint**: `GET /courses`

**Description**: Fetches all available courses.

**Responses**:
- `200`: Returns an array of courses.
- `404`: No courses found.
- `500`: Server error.

---

### 2. Get Course by ID
**Endpoint**: `GET /course/:id`

**Description**: Fetches details of a specific course by its ID.

**Request Parameters**:
- `id` (Path): Course's unique identifier.

**Responses**:
- `200`: Returns course data.
- `404`: Course not found.
- `500`: Server error.

---

### 3. Update Course by ID
**Endpoint**: `PUT /course/update/:id`

**Description**: Updates the details of a specific course by its ID.

**Request Parameters**:
- `id` (Path): Course's unique identifier.

**Request Body**:
- `poster`, `title`, `description`, `mode`, `language`, `price`, `discount_price`, `total_content`, `course_duration` (Optional): Updated course details.

**Responses**:
- `200`: Returns updated course data.
- `404`: Course not found.
- `500`: Server error.

---

### 4. Delete Course by ID
**Endpoint**: `DELETE /course/remove/:id`

**Description**: Deletes a specific course by its ID.

**Request Parameters**:
- `id` (Path): Course's unique identifier.

**Responses**:
- `200`: Returns deleted course data.
- `404`: Course not found.
- `500`: Server error.

---

## Notes
- All endpoints are part of the `adminRouter` and require appropriate permissions for access.
- Ensure proper error handling and authentication for secure operations.

---


# API Documentation for Admin Routes

## Base URL `domain-name/api/admin`


---

## Enrollment Management

### 1. Get All Enrollments
**Endpoint:** `/enrollments`

**Method:** `GET`

**Description:** Retrieve all enrollment records.

**Response:**
- **200 OK:** Returns a list of all enrollments.
- **404 Not Found:** No enrollment details found.
- **500 Internal Server Error:** An error occurred on the server.

**Sample Response:**
```json
{
  "data": [
    {
      "_id": "64bcf3a7e0a7b5f5d8a8b1e3",
      "course_Id": "64bcf3a7e0a7b5f5d8a8b1e2",
      "learner_Id": "64bcf3a7e0a7b5f5d8a8b1e1",
      "status": "active",
      "progress_percentage": 70
    }
  ]
}
```

---

### 2. Get Enrollment Details by ID
**Endpoint:** `/enrollment/:id`

**Method:** `GET`

**Description:** Retrieve details of a specific enrollment by its ID.

**Parameters:**
- **Path Parameter:** `id` - The ID of the enrollment.

**Response:**
- **200 OK:** Returns enrollment details.
- **404 Not Found:** Enrollment not found.
- **500 Internal Server Error:** An error occurred on the server.

**Sample Response:**
```json
{
  "data": {
    "_id": "64bcf3a7e0a7b5f5d8a8b1e3",
    "course_Id": "64bcf3a7e0a7b5f5d8a8b1e2",
    "learner_Id": "64bcf3a7e0a7b5f5d8a8b1e1",
    "status": "active",
    "progress_percentage": 70
  }
}
```

---

### 3. Update Enrollment Details
**Endpoint:** `/enrollment/update/:id`

**Method:** `PUT`

**Description:** Update details of a specific enrollment.

**Parameters:**
- **Path Parameter:** `id` - The ID of the enrollment to update.
- **Body Parameters (Optional):**
  - `learner_Id`: The ID of the learner.
  - `status`: The current status of the enrollment.
  - `course_Id`: The ID of the course.
  - `progress_percentage`: The progress percentage of the learner in the course.

**Response:**
- **200 OK:** Enrollment successfully updated.
- **404 Not Found:** Enrollment not found.
- **500 Internal Server Error:** An error occurred on the server.

**Sample Response:**
```json
{
  "message": "enrollment has successfully updated",
  "data": {
    "_id": "64bcf3a7e0a7b5f5d8a8b1e3",
    "course_Id": "64bcf3a7e0a7b5f5d8a8b1e2",
    "learner_Id": "64bcf3a7e0a7b5f5d8a8b1e1",
    "status": "completed",
    "progress_percentage": 100
  }
}
```

---

### 4. Delete Enrollment by ID
**Endpoint:** `/enrollment/remove/:id`

**Method:** `DELETE`

**Description:** Delete a specific enrollment by its ID.

**Parameters:**
- **Path Parameter:** `id` - The ID of the enrollment to delete.

**Response:**
- **200 OK:** Enrollment successfully deleted.
- **404 Not Found:** Enrollment not found.
- **500 Internal Server Error:** An error occurred on the server.

**Sample Response:**
```json
{
  "message": "enrollment detail has been deleted",
  "data": {
    "_id": "64bcf3a7e0a7b5f5d8a8b1e3",
    "course_Id": "64bcf3a7e0a7b5f5d8a8b1e2",
    "learner_Id": "64bcf3a7e0a7b5f5d8a8b1e1",
    "status": "completed",
    "progress_percentage": 100
  }
}
```

---





# Payment Routes Documentation

## Base URL
`domain-name/api/admin`

### **Get All Payment Details**
#### Endpoint
`GET /payment/details/`

#### Description
Fetches all payment details, including associated enrollment and learner information.

#### Request
- **Headers:**
  - `Authorization`: Bearer token for authentication.

#### Response
- **200 OK**:
  ```json
  {
    "data": [
      {
        "_id": "<paymentId>",
        "enrollment_Id": "<enrollmentId>",
        "learner_Id": "<learnerId>",
        "payment_details": { ... },
        "user_detail": { ... }
      }
    ]
  }
  ```
- **404 Not Found**:
  ```json
  {
    "message": "payment detail not found"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "error": "<error_message>"
  }
  ```

---

### **Get All Payments of a Learner**
#### Endpoint
`GET /payment/learner-details/:learner_Id`

#### Description
Fetches all payment and enrollment details for a specific learner.

#### Parameters
- **Path Parameters:**
  - `learner_Id`: ObjectId of the learner.

#### Request
- **Headers:**
  - `Authorization`: Bearer token for authentication.

#### Response
- **200 OK**:
  ```json
  {
    "data": [
      {
        "_id": "<paymentId>",
        "enrollment_Id": "<enrollmentId>",
        "learner_Id": "<learnerId>",
        "enrollment_details": { ... },
        "user_detail": { ... }
      }
    ]
  }
  ```
- **404 Not Found**:
  ```json
  {
    "message": "Payment detail not found for the specified learner"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "error": "<error_message>"
  }
  ```

---

### **Get Payment Detail by Payment ID**
#### Endpoint
`GET /payment/learner-detail/:paymentId`

#### Description
Fetches the payment detail, including associated enrollment and learner details, by payment ID.

#### Parameters
- **Path Parameters:**
  - `paymentId`: ObjectId of the payment.

#### Request
- **Headers:**
  - `Authorization`: Bearer token for authentication.

#### Response
- **200 OK**:
  ```json
  {
    "data": {
      "_id": "<paymentId>",
      "enrollment_Id": "<enrollmentId>",
      "learner_Id": "<learnerId>",
      "enrollment_details": { ... },
      "user_detail": { ... }
    }
  }
  ```
- **404 Not Found**:
  ```json
  {
    "message": "Payment detail not found for the specified learner"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "error": "<error_message>"
  }
  
