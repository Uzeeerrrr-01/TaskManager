import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import taskRoutes from './routes/tasks.js'
import userRoutes from './routes/users.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())

// ── Routes ──────────────────────────────────────────────
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── Error handling ──────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ── DB + Start ──────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
