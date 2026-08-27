import mongoose from 'mongoose';
const { Schema } = mongoose;

const TodoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('todos', TodoSchema)