import React from 'react'
import Header from '../../components/admin/Header'

function AdminPage({children}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}

export default AdminPage