import React from 'react'
import AdminSidebar from '../navbar/AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <>
        <AdminSidebar />
        { children }
    </>
  )
}
