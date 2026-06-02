# Exercises

## 1. Getting Started with MySQL connection in the post-API
- Begin with installing the packages mysql2, dotenv and cors: npm install mysql2 dotenv cors
- Also install the type definitions for some packages: npm install -D @types/dotenv @types/cors
- In Beekeeper Studio -> Create a DB with a posts-table, with the following fields:
  - id INT(10) PK 
  - title VARCHAR(100)
  - content TEXT
  - author VARCHAR(100)
  - created_at TIMESTAMP CURRENT_TIMESTAMP
- Establish a DB-connection in config/db.ts. In Aiven, see connection information:
  - host:
  - user:
  - password: 
  - database: 
  - port: 
- Make sure the above credentials are saved in a .env file, and used by importing the dotenv package

## 2. Rewrite Post-API, using mysql instead of working with a local array, just as we did in the lesson
- Build on the previous code, rewrite the GET/POST/DELETE endpoints using database queries to perform CRUD, instead of using the local array 

## 3. Rewrite the rest of the code that wasnt covered in the lesson
- The following parts wasn't covered in the lesson, but is still part of the exercise for you to figure out:
  - Rewrite the PATCH-endpoint to use MySQL instead of local array, 
  - Make the search and sort functionality work with the databse, on the Get All Posts endpoint