import express from 'express'
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats,
} from '../controllers/taskController.js'

const router = express.Router()

// Stats (must come before /:id to avoid conflict)
router.get('/stats', getStats)

// CRUD
router.get('/',     getTasks)
router.get('/:id',  getTaskById)
router.post('/',    createTask)
router.put('/:id',  updateTask)
router.delete('/:id', deleteTask)

export default router
