# ExpressAPI with MongoDB/Mongoose and exercises

## Videolinks
- [01 - ExpressAPI with MongoDB and JOINS, via an ODM-tool Mongoose - kommer snart]()


## The code walkthrough
- [02-todosapi-mongoDB-with-JOINS-exercises](02-todosapi-mongoDB-with-JOINS-exercises)


## Reading suggestions
- [Mongoose docs - Getting Started](https://mongoosejs.com/docs/index.html)
- [Mongoose docs - Schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose docs - SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
- [Mongoose docs - Models](https://mongoosejs.com/docs/api/model.html)



# Exercises
- First do exercises 1, 2, 3 from the previous lecture found in [lecture-16/README.md](../lecture-16/README.md)



## 4. Add JOINS with Mongoose virtuals and populate
Continue working on the same API you built in exercises 1-3. Now you will add a **second model** and connect the two using Mongoose `virtuals` and `.populate()`, just as we did with Todos and Subtasks in the lesson.

Pick whichever pair you are working with:
- **Posts API** -> Add a `Comment` model (a post has many comments)
- **Products API** -> Add a `Category` model (a category has many products)

### Step 1 - Create the child model
Create a new Mongoose model for your second table. Example for a `Comment` model:
- `content` (String, required)
- `post_id` (Schema.Types.ObjectId, ref: 'posts', required) - this is the foreign key that links to the parent
- `created_at` (Date, default: Date.now)

### Step 2 - Add a virtual field on the parent model
On your parent model (e.g. `Post`), add a Mongoose virtual that defines the relationship to the child. This is how Mongoose knows how to "JOIN" the two collections:
- Use `ModelSchema.virtual('fieldName', { ... })` to define the virtual
- Set `ref` to the child model name (e.g. `'comments'`)
- Set `localField` to `'_id'`
- Set `foreignField` to the field in the child that references the parent (e.g. `'post_id'`)

Also make sure to enable virtuals in output by passing both `toJSON: { virtuals: true }` and `toObject: { virtuals: true }` as schema options.

### Step 3 - Use `.populate()` in your GET endpoints
Update your parent's GET endpoints to use `.populate('fieldName')` so the related children are included in the response:
- `GET /posts` should return all posts with their comments populated
- `GET /posts/:id` should return a single post with its comments populated

### Step 4 - Build CRUD endpoints for the child resource
Create routes and controller functions for the child model:
- `GET /comments/:id` - Fetch a single comment by ID
- `POST /comments` - Create a new comment (remember to include the `post_id` in the request body)
- `PATCH /comments/:id` - Update a comment
- `DELETE /comments/:id` - Delete a comment

### Step 5 - Test everything in Insomnia/Postman
- Create a few posts, then create comments linked to those posts
- Verify that `GET /posts` returns posts with their comments nested inside
- Verify that CRUD operations on comments work correctly
