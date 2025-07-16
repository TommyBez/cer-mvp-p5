'use client'

import React from 'react'
import { ResponsiveTable } from './responsive-table'
import './responsive-table-demo.css'

// Example data type
interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastActive: string
}

// Example data
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2024-01-15 10:30'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    lastActive: '2024-01-15 09:45'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'Inactive',
    lastActive: '2024-01-14 15:20'
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'User',
    status: 'Active',
    lastActive: '2024-01-15 11:00'
  }
]

export function ResponsiveTableDemo() {
  // Define columns with priority for mobile view
  const columns = [
    {
      key: 'name',
      header: 'Name',
      accessor: (user: User) => user.name,
      priority: 10 // Highest priority - shown first on mobile
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (user: User) => user.email,
      className: 'truncate',
      priority: 8
    },
    {
      key: 'role',
      header: 'Role',
      accessor: (user: User) => (
        <span className={`badge ${user.role.toLowerCase()}`}>
          {user.role}
        </span>
      ),
      priority: 6
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (user: User) => (
        <span className={`status ${user.status.toLowerCase()}`}>
          {user.status}
        </span>
      ),
      priority: 7
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      accessor: (user: User) => user.lastActive,
      priority: 5
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: (user: User) => (
        <div className="actions">
          <button className="btn-small">Edit</button>
          <button className="btn-small">Delete</button>
        </div>
      ),
      className: 'actions',
      priority: 1 // Lowest priority - shown last on mobile
    }
  ]

  return (
    <div className="demo-container">
      <h2>Responsive Table Demo</h2>
      
      <h3>Card Layout (Default for Mobile)</h3>
      <ResponsiveTable
        data={users}
        columns={columns}
        mobileLayout="card"
        getRowKey={(user) => user.id}
        className="demo-table"
      />

      <h3>Horizontal Scroll Layout (Alternative for Mobile)</h3>
      <ResponsiveTable
        data={users}
        columns={columns}
        mobileLayout="scroll"
        getRowKey={(user) => user.id}
        className="demo-table"
      />
    </div>
  )
}