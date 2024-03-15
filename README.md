# COEPTech Hostel Management System

This repository contains the codebase for the COEPTech Hostel Management System. It is a system designed to manage various aspects of a hostel, including student information, room allocation, and more.

## Features

- **User Authentication**: Secure authentication system for users with role-based access control.
- **Student Management**: Manage student information, including name, MIS, room allocation, etc.
- **Room Management**: Allocate and manage rooms for students.
- **Admin Dashboard**: Dashboard for administrators to monitor and manage hostel activities.

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - Axios
  - React Bootstrap
  - React Icons
  - React Toastify

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT) for authentication
  - bcryptjs for password hashing
  - dotenv for environment variables

## Setup Instructions

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/Swarnim-K/COEPTech_Hostel_Management_System.git
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables like `PORT`, `MONGODB_URI`, and `JWT_SECRET`.

4. **Start the Application**:
   - Navigate to the project directory:
     ```bash
     cd COEPTech_Hostel_Management_System
     ```
   - For starting the client:
     ```bash
     ./start.sh client
     ```
   - For starting the server:
     ```bash
     ./start.sh server
     ```

5. **Access the Application**:
   Once the server is running, access the application at `http://localhost:3000` in your web browser.
