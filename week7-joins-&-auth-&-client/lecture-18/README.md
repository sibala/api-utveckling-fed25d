# MongoDB Embedded Documents, DB Design & Client

## Videolinks
- [01 - ](#)
- [02 - ](#)
- [03 - ](#)


## The code walkthrough
- [01-todosapi-mongoDB-joins-solutions](01-todosapi-mongoDB-joins-solutions) - TodosAPI with separate collections and joins (virtual/populate)
- [02-todosapi-mongoDB-embedded](02-todosapi-mongoDB-embedded) - TodosAPI with embedded subtasks
- [03-todosclient](03-todosclient) - Client that consumes the embedded TodosAPI


## Reading suggestions
- [Genomgang - Databasdesign dokumentbaserad DB.pdf](Genomgång%20-%20Databasdesign%20dokumentbaserad%20DB.pdf)
- [Mongoose docs - Subdocuments (Embedded)](https://mongoosejs.com/docs/subdocs.html)
- [Mongoose docs - Populate (Joins/References)](https://mongoosejs.com/docs/populate.html)
- [MongoDB docs - Data Model Design](https://www.mongodb.com/docs/manual/core/data-model-design/)


# Exercises

## 1. Implement Embedded Subtasks - Refactor from joins to embedded
Refactor your TodosAPI so that subtasks are embedded inside the Todo document, instead of being stored in a separate collection with references.
- Remove the separate `Subtask` model
- Add a `SubtaskSchema` as a subdocument array inside the `TodoSchema`
- Update the controller so that subtask CRUD operations work on the embedded array (using Mongoose subdocument methods like `.push()`, `.id()`, `.deleteOne()`)
- Update the routes so that subtask endpoints are nested under todos (e.g. `POST /todos/:id/subtasks`, `PATCH /todos/:id/subtasks/:subtaskId`, `DELETE /todos/:id/subtasks/:subtaskId`)
- Verify that `GET /todos/:id` returns the todo with its subtasks included automatically (no populate needed)

## 2. Create Subtasks via the Client - Add a form in `todo.html`
- Uncomment the subtask form in `todo.html`
- Uncomment the form submit event listener in `todo.js`
- The form should `POST` to `/todos/:id/subtasks` with the subtask content
- After creating a subtask, the subtask list should refresh automatically

## 3. Delete Subtasks via the Client - Add delete buttons in `todo.html`
- Uncomment the delete buttons in the subtask list rendering in `todo.js`
- Uncomment the `deleteSubtask` function in `todo.js`
- Each subtask should have a delete button that sends a `DELETE` request to `/todos/:id/subtasks/:subtaskId`
- After deleting a subtask, the subtask list should refresh automatically
