# Task Management System
---

## Overview
This project is a full-stack Task Management application built using React with TypeScript on the frontend, TypeScript on the backend, and PostgreSQL as the database. It allows users to register and log in securely, and then create, view, update, and delete tasks tied to their account. The application uses JWT-based authentication to protect task routes and bcrypt for password hashing.

The goal is to provide a minimal yet fully functional solution focusing on correctness, security, and code clarity, suitable for rapid development.

**Key features include:**

- User registration and login with hashed passwords

- JWT authentication and authorization on task operations

- CRUD operations for user-specific tasks (create, read, update, delete)

- Simple React UI for interacting with tasks and authentication

## Instructions:
To run the backend navigate to the backend folder of the project and first install any dependencies using the command `npm install`. If this is the first time running the backend then to ensure that the database is set up run the commands `npx prisma generate` followed by `npx prisma migrate dev --name init` in the backend folder. This step is required to create the necessary tables in the database as defined in the Prisma schema. Once the migration is complete, you can run the backend by typing `npm run dev`. While the backend is running, to then run the frontend open a new terminal window and navigate to the frontend folder and to install any npm dependencies type `npm install`. Once they have been installed, to then start the server type the command `npm start`. The frontend will run on http://localhost:3000 by default. The user can then navigate to the browser and visit http://localhost:3000 to access the Task Management application, where they can register, log in, and manage their tasks.

**Notes:**
- Make sure both frontend and backend servers are running at the same time in separate terminals for the full app to function correctly.

- If you encounter dependency issues, ensure that the Prisma version you install is compatible with your local TypeScript version. Prisma @6.x typically requires TypeScript >=5.1.0.


