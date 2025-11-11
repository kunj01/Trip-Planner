import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

function Layout() {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
    </>
  )
}

export default Layout