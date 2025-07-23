import React from 'react'
import { Link } from 'react-router-dom'

const JobCard = ({job,onDelete}) => {
  return (
    <div className='bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-all flex flex-col justify-between'>
      <div>
        <h3 className='text-2xl font-semibold text-gray-800'>{job.position}</h3>
        <p className='text-gray-600 mb-2'>{job.company}</p>
        <span
        className={`inline-blockpx-3 py-1 rounded-full text-sm font-medium ${
            job.status==='interview'
            ? "bg-yellow-100 text-yellow-800"
            : job.status==="rejected"
            ? "bg-red-100 text-red-800"
            : job.status==="pending"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }`}
        >
            {job.status}
        </span>
      </div>
      <div className='mt-4 flex-gap-3'>
        <Link to={'/edit-job/${job._id}'}>
        <button className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition'>Edit
        </button>
        </Link>
        <button 
        onClick={()=>onDelete(job._id)}
        className='bg-red hover:bg-red-600 text-white px-4 py-2 rounded-md transition'
        >Delete</button>
      </div>
    </div>
  )
}

export default JobCard
