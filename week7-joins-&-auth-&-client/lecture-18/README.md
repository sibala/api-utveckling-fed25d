# MongoDB Embedded Documents, DB Design & Client

## Videolinks
- [01 - solutions on todosapi with MongoDB and Joins](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260901%5F090143%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Eea0af516%2Da026%2D4f7b%2D9eac%2D4e5eb068ea2d)
- [02 - todosapi with Embedded subtasks in todos](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260901%5F093645%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E0a5b79cb%2D8e03%2D46e4%2Da00b%2D175998e68079)
- [03 - Client displaying todos list & specific todo with associated subtasks](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260901%5F110113%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E8ef38135%2D806a%2D44ef%2D864c%2D21ec633b3440)
- [04 - Client creating/deleting todos](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2F08%20API%2Dutveckling%2D20260901%5F130144%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ed4125f40%2D4d14%2D4580%2Da7a3%2D126fcdfefaeb)


## The code walkthrough
- [01-todosapi-mongoDB-joins-solutions](01-todosapi-mongoDB-joins-solutions) - TodosAPI with separate collections and joins (virtual/populate)
- [02-todosapi-mongoDB-embedded](02-todosapi-mongoDB-embedded) - TodosAPI with embedded subtasks
- [03-todosclient](03-todosclient) - Client that consumes the embedded TodosAPI


## Reading suggestions
- [Genomgang - Databasdesign dokumentbaserad DB.pdf](Genomgång%20-%20Databasdesign%20dokumentbaserad%20DB.pdf)
- [Mongoose docs - Subdocuments (Embedded)](https://mongoosejs.com/docs/subdocs.html)
- [Mongoose docs - Populate (Joins/References)](https://mongoosejs.com/docs/populate.html)
- [MongoDB docs - Data Model Design](https://www.mongodb.com/docs/manual/core/data-model-design/)

### Client
- [MDN - try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [MDN - Fetch API (GET, POST, DELETE)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN - async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [MDN - JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN - window.location.href](https://developer.mozilla.org/en-US/docs/Web/API/Location/href)


# Exercises

## 1. Implement Embedded Subtasks - Refactor from joins to embedded
Refactor your TodosAPI so that subtasks are embedded inside the Todo document, instead of being stored in a separate collection with references.
- Remove the separate `Subtask` model
- Add a `SubtaskSchema` as a subdocument array inside the `TodoSchema`
- Update the controller so that subtask CRUD operations work on the embedded array (using Mongoose subdocument methods like `.push()`, `.id()`, `.deleteOne()`)
- Update the routes so that subtask endpoints are nested under todos (e.g. `POST /todos/:id/subtasks`, `PATCH /todos/:id/subtasks/:subtaskId`, `DELETE /todos/:id/subtasks/:subtaskId`)
- Verify that `GET /todos/:id` returns the todo with its subtasks included automatically (no populate needed)

## 2. Create Subtasks via the Client - Add a form in `todo.html`
- Add a subtask form in `todo.html`
- Add a form submit event listener in `todo.js`
- The form should `POST` to `/todos/:id/subtasks` with the subtask content
- After creating a subtask, the subtask list should refresh automatically

## 3. Delete Subtasks via the Client - Add delete buttons in `todo.html`
- Add a delete buttons in the subtask list rendering in `todo.js`
- Add a `deleteSubtask` function in `todo.js`
- Each subtask should have a delete button that sends a `DELETE` request to `/todos/:id/subtasks/:subtaskId`
- After deleting a subtask, the subtask list should refresh automatically
