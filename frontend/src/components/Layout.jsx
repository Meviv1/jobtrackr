import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
  <div className='min-h-screen bg-gradient-to-br from-slate-200 via-cyan-200 to-blue-300'>
    <Navbar/>
    <main className='max-w-6xl mx-auto pt-6 px-4'>
        <Outlet/>
    </main>
    </div>
  )
}

export default Layout
