import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubtaskSchema = new Schema({
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
});

const TodoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  subtasks: [SubtaskSchema],
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('todos', TodoSchema)
