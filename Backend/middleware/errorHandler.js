// 404 — route not found
export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
}

// Global error handler
export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ success: false, message: messages.join(', ') })
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Duplicate field value' })
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
}
