# Exercises

## Exercise 01-express-crud
- Build on the previous code, create new endpoints for POST/PATCH/DELETE posts 
- The POST endpoint should create a new post with the following properties: id, title, content, author
  - Validate required fields title, content, author
- The PATCH endpoint should update an existing post with the “:id” path param. Should be able to update the title, content and author
  - Validate required fields title, content, author
- The DELETE endpoint should delete an existing post with the “:id” path param

## Exercise 02-express-validation-errorhandling
- Build on the previous code, add error handling with try/catch on all your endpoints
- Return data with correct HTTP status codes
  - 200 - OK
  - 201 - Created
  - 400 - Bad Request
  - 404 - Not Found
  - 500 - Internal Sever Error
