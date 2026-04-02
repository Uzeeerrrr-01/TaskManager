import User from '../models/User.js'
import Task from '../models/Task.js'

// GET /api/users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ name: 1 })

    // Attach task count per user
    const withCounts = await Promise.all(
      users.map(async (u) => {
        const taskCount = await Task.countDocuments({ user: u.name })
        return { ...u.toObject(), taskCount }
      })
    )

    res.json({ success: true, count: users.length, data: withCounts })
  } catch (err) {
    next(err)
  }
}

// GET /api/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

// POST /api/users
export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

// PUT /api/users/:id
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, message: 'User deleted' })
  } catch (err) {
    next(err)
  }
}
