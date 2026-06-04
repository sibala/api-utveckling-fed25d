# Exercises

## 1. Create a new table in PHPMyAdmin
- In PHPMyAdmin in the same DB as your "posts"-table -> Create a new table "comments" with the following fields:
  - id INT(10) PK 
  - post_id INT(10) FK 
  - content TEXT
  - author VARCHAR(100)
  - created_at TIMESTAMP CURRENT_TIMESTAMP

## 2. Extend the Post-API with CRUD for the table "comments"
- Add CRUD handling for the new table "comments" in the Post-API, as we did in the lesson for todo-API

## 3. Extend the Post-API, work with SQL Joins 
- Extend the SQL query for fetching specific post, by adding a JOIN between "posts" and "comments".
- The expected retrieved data is a post with all associated comments to a specific post. Se example below:

<br />

[GET]    http://localhost:3000/posts/:id
---
>Response JSON Body:
``` 
{
  "id": "25",
  "title": "The wonders of the universe",
  "content": "I wonder ....",
  "author": "John Smith",
  "created_at": "2025-03-12T18:25:32.000Z",
  "comments": [
    {
      "id": 51,
      "post_id": 25,
      "content": "Great post man!!! Keep up the good work",
      "author": "Jason Bourne",
      "created_at": "2025-03-12T18:25:32.000Z",
    },
    {
      "id": 89,
      "post_id": 25,
      "content": "Never thought about the universe that way. Thank you for the insights!",
      "author": "Marie Jacksson",
      "created_at": "2025-03-12T18:25:32.000Z",
    }
  ]
}
``` 


## 4. Extend the Post Client [Extra exercise]
- Display the comments on the page for specific posts