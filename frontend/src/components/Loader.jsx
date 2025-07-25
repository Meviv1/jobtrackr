import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center py-10'>
      <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader
