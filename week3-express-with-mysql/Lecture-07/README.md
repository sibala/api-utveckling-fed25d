# Videolinks
- [01 - mysql connection](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260602%5F092120%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ecd347376%2Dd0e3%2D46c1%2D9b12%2Dfa72f7ecc6da)

- [02 - rewrite fetchAllTodos and fetchTodo using DB connection](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260602%5F103101%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ec1cf0a9e%2D48ac%2D4126%2Db937%2D2af0a15dfb3d)

- [03 - rewrite createTodo and deleteTodo using DB connection](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260602%5F114136%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E9badd8dd%2Dab97%2D43a5%2Dbed5%2D65e52b994953)



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