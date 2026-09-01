import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubtaskSchema = new Schema({
	todo_id: {
		type: Schema.Types.ObjectId,
		ref: 'todos',
		required: true
	},
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

export default mongoose.model('subtasks', SubtaskSchema)