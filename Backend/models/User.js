import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      default: 'Team member',
      trim: true,
    },
    initials: {
      type: String,
      maxlength: 3,
    },
    color: {
      type: String,
      default: 'bg-gray-100 text-gray-500',
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
