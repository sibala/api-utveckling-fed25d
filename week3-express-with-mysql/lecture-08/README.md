# Videolinks

- [01 - HTTP protocol, Frontend vs Backend, Repeat how the API works](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260604%5F090259%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E08157074%2D0aec%2D4850%2D9d54%2Dbba9800e25d9)

- [02 - Create subtask table with FK, and extend CRUD capabilities for the subtasks table in the API](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260604%5F103016%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E28dce857%2D55ca%2D42d4%2D9105%2Dd1b8426291e2)

- [03 - fetchTodo is extended so that it displays the subtasks belonging to a specific todo](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FFED25%20%2D%20API%2Dutveckling%2D20260604%5F113102%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E5a657449%2Ddc23%2D4695%2D84b1%2D86ba007a6030)


# Exercises

## 1. Create a new table in Beekeeper Studio
- In Beekeeper in the same DB as your "posts"-table -> Create a new table "comments" with the following fields:
  - id INT UNSIGNED PK 
  - post_id INT UNSIGNED FK 
  - content TEXT
  - author VARCHAR(100)
  - created_at TIMESTAMP CURRENT_TIMESTAMP

## 2. Extend the Post-API with CRUD for the table "comments"
- Add CRUD handling for the new table "comments" in the Post-API, as we did in the lesson for subtasks in todo-API

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