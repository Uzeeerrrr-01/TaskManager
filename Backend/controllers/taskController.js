import Task from '../models/Task.js'

// GET /api/tasks
// Query params: status, priority, search
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query
    const filter = {}

    if (status && status !== 'all')  filter.status   = status
    if (priority)                    filter.priority  = priority
    if (search)                      filter.title     = { $regex: search, $options: 'i' }

    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, count: tasks.length, data: tasks })
  } catch (err) {
    next(err)
  }
}

// GET /api/tasks/:id
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' })
    res.json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
}

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
}

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' })
    res.json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' })
    res.json({ success: true, message: 'Task deleted' })
  } catch (err) {
    next(err)
  }
}

// GET /api/tasks/stats
export const getStats = async (req, res, next) => {
  try {
    const [total, inprog, done, high] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: 'inprog' }),
      Task.countDocuments({ status: 'done' }),
      Task.countDocuments({ priority: 'High' }),
    ])
    res.json({ success: true, data: { total, inprog, done, high } })
  } catch (err) {
    next(err)
  }
}
