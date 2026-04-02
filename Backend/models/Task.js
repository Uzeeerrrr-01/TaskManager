import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    desc: {
      type: String,
      default: '',
      trim: true,
    },
    user: {
      type: String,
      required: [true, 'Assigned user is required'],
      trim: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['open', 'inprog', 'done'],
      default: 'open',
    },
    due: {
      type: String, // stored as 'YYYY-MM-DD' string to match frontend
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
)

export default mongoose.model('Task', taskSchema)
