import mongoose from 'mongoose';
const { Schema } = mongoose;

const TodoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

TodoSchema.virtual('subtasks', {
  ref: 'subtasks',
  localField: '_id',
  foreignField: 'todo_id'
})

export default mongoose.model('todos', TodoSchema)