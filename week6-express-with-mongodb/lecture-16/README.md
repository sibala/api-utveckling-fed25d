# ExpressAPI with MongoDB/Mongoose and exercises

## Videolinks
- [01 - Solutions on MongoDB exercises](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260827%5F091638%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Eca8d8e90%2D56ef%2D4669%2Da750%2D00b2938bef03)
- [02 - ExpressAPI with MongoDB, via an ODM-tool Mongoose - PART 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F08%20API%2Dutveckling%2FRecordings%2FAPI%2Dutveckling%2D20260827%5F100555%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E988b8a6b%2Df786%2D4b66%2Dad81%2D9329e84539ae)


## The code walkthrough
- [01-todosapi-mongoDB-with-exercises](01-todosapi-mongoDB-with-exercises)


## Reading suggestions
- [Mongoose docs - Getting Started](https://mongoosejs.com/docs/index.html)
- [Mongoose docs - Schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose docs - SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
- [Mongoose docs - Models](https://mongoosejs.com/docs/api/model.html)



# Exercises

## 1. Getting Started - Rebuild an old API (Posts/Comments OR Products/Categories ) with MongoDB/Mongoose
- Rebuild an old API, but replace MySQL with MongoDB via the ODM-tool Mongoose
- Install the necessary packages: `npm install mongoose`
- Create a MongoDB database (e.g. via MongoDB Compass)
- Set up the Mongoose connection in `index.ts`, using a connection string from a `.env` file
- Create a Mongoose model for your table, which ever you choose. Here is an example a Posts table with following fields:
  - `title` (String, required)
  - `content` (String, required)
  - `author` (String, required)
  - `created_at` (Date, default: Date.now)

## 2. Build the basic CRUD endpoints, just as we did in the lesson
Implement the following endpoints using Mongoose queries, as demonstrated in the lesson. Example of endpoints for the Posts table:
- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch a single post by ID
- `POST /posts` - Create a new post
- `DELETE /posts/:id` - Delete a post by ID

## 3. On your own - Complete the remaining functionality
The following parts were not covered in the lesson. Figure them out on your own:
- `PATCH /posts/:id` - Update a post (title, content, author)
- Add search functionality on the `GET /posts` endpoint (search by title using query params, e.g. `?search=hello`)
- Add sort functionality on the `GET /posts` endpoint (sort by title using query params, e.g. `?sort=asc` or `?sort=desc`)
