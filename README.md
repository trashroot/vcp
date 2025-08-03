# Student Management System (Node.js, MVC)

This project is a simple Student Management System built with Node.js using the MVC (Model-View-Controller) pattern. It exposes RESTful endpoints for managing students (CRUD operations) and does not include any views.

## Features
- Add, view, update, and delete students
- Organized using MVC pattern (models, controllers, routes)
- Express.js for routing

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Use a tool like Postman or curl to interact with the endpoints.

## Endpoints
- `GET    /students`         - List all students
- `GET    /students/:id`     - Get a student by ID
- `POST   /students`         - Create a new student
- `PUT    /students/:id`     - Update a student by ID
- `DELETE /students/:id`     - Delete a student by ID

## Project Structure
- `models/`      - Data models
- `controllers/` - Business logic
- `routes/`      - API endpoints
- `app.js`       - Main application entry point

---

This project is for demonstration purposes and uses in-memory storage. For production, connect to a database.
