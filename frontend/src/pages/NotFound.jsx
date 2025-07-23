import { Link } from "react-router-dom";

import React from 'react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4"></h1>
      <p className="text-2xl font-semibold mb-2"></p>
      <p className="text-gray-500 mb-4">The page you are looking for doesn't exist or has moved</p>
      <Link to="/" 
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
      >Go to Home</Link>
    </div>
  )
}

export default NotFound
