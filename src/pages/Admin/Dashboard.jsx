import React, { useEffect, useState } from 'react'
import { get } from '../../services/Endpoint'

const Dashboard = () => {
const [posts, setPost] = useState([])
const [users, setUser] = useState([])
const [comments, setComment] = useState([])
  useEffect(() => {
    const Getdata  = async () => {
      try {
        const res = await get('/dashboard')
        const data = res.data
        setComment(data.Comments)
        setPost(data.Posts)
        setUser(data.Users)
      } catch (error) {
        console.log(error); 
      }  
    }
    Getdata()
  },[])
  
  return (
    <div className='sm:p-4'>
        <div className='sm:grid grid-cols-3 gap-4'>
        <div className=' border border-gray-200 hover:bg-gray-300 hover:border-[#ebfff3] py-3 mb-4 sm:mb-0 px-4'>
            <h4 className='text-[1.9rem] sm:text-[1.6rem] text-gray-600'>Total Users</h4>
            <h4 className='text-[1.2rem] text-gray-600'>{users && users.length}</h4>
        </div>
        <div className=' border border-gray-200 hover:bg-gray-300 hover:border-[#ebfff3] py-3 mb-4 sm:mb-0 px-4'>
            <h4 className='text-[1.9rem] sm:text-[1.6rem] text-gray-600 '>Total Posts</h4>
            <h4 className='text-[1.2rem] text-gray-600'>{posts && posts.length}</h4>
        </div>
        <div className=' border border-gray-200 hover:bg-gray-300 hover:border-[#ebfff3] py-3 mb-4 sm:mb-0 px-4'>
            <h4 className='text-[1.9rem] sm:text-[1.6rem] text-gray-600 '>Total Comments</h4>
            <h4 className='text-[1.2rem] text-gray-600'>{comments && comments.length}</h4>
        </div>
        </div>
    </div>
  )
}

export default Dashboard