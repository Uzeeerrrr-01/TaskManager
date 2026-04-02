/**
 * Seed script — populates MongoDB with initial tasks and users.
 * Run once: node seed.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Task from './models/Task.js'
import User from './models/User.js'

dotenv.config()

const USERS = [
  { name: 'John Doe',   role: 'UI Designer',       initials: 'JD', color: 'bg-blue-100 text-blue-700' },
  { name: 'Sarah Chen', role: 'Backend Developer',  initials: 'SC', color: 'bg-purple-100 text-purple-700' },
  { name: 'Mike Kumar', role: 'QA Engineer',        initials: 'MK', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Lisa Ray',   role: 'Product Manager',    initials: 'LR', color: 'bg-pink-100 text-pink-700' },
  { name: 'Aryan Shah', role: 'Full Stack Dev',     initials: 'AR', color: 'bg-amber-100 text-amber-700' },
]

const TASKS = [
  { title: 'UI Design System',  user: 'John Doe',   priority: 'High',   status: 'open',   due: '2026-04-12', desc: 'Build a consistent design system for the product.' },
  { title: 'API Integration',   user: 'Sarah Chen', priority: 'Medium', status: 'inprog', due: '2026-04-15', desc: 'Integrate third-party payment API.' },
  { title: 'QA Testing Suite',  user: 'Mike Kumar', priority: 'Low',    status: 'done',   due: '2026-04-10', desc: 'Write end-to-end tests for the dashboard.' },
  { title: 'Onboarding Flow',   user: 'Lisa Ray',   priority: 'High',   status: 'open',   due: '2026-04-18', desc: 'Design and implement the user onboarding experience.' },
  { title: 'Database Schema',   user: 'Aryan Shah', priority: 'Medium', status: 'inprog', due: '2026-04-20', desc: 'Finalize the database schema for v2.' },
  { title: 'Email Templates',   user: 'John Doe',   priority: 'Low',    status: 'done',   due: '2026-04-08', desc: 'Create transactional email templates.' },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await Task.deleteMany()
    await User.deleteMany()
    console.log('🗑  Cleared existing data')

    // Insert fresh data
    await User.insertMany(USERS)
    await Task.insertMany(TASKS)
    console.log(`🌱 Seeded ${USERS.length} users and ${TASKS.length} tasks`)

    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
