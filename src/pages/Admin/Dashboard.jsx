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
        <div className=' border border-gray-200 hover:bg-[#ebfff3] hover:border-[#ebfff3] py-3 mb-4 sm:mb-0 px-4'>
            <h4 className='text-[1.9rem] sm:text-[1.6rem] text-[#00eb5b]'>Total Users</h4>
            <h4 className='text-[1.2rem] text-[#00eb5b]'>{users && users.length}</h4>
        </div>
        <div className=' border border-gray-200 hover:bg-[#ebfff3] hover:border-[#ebfff3] py-3 mb-4 sm:mb-0 px-4'>
            <h4 className='text-[1.9rem] sm:text-[1.6rem] text-[#00eb5b] '>Total Posts</h4>
            <h4 className='text-[1.2rem] text-[#00eb5b]'>{posts && posts.length}</h4>
        </div>
        <div className=' border border-gray-200 hover:bg-[#ebfff3] hover:border-[#ebfff3] py-3 mb-4 sm:mb-0 px-4'>
            <h4 className='text-[1.9rem] sm:text-[1.6rem] text-[#00eb5b] '>Total Comments</h4>
            <h4 className='text-[1.2rem] text-[#00eb5b]'>{comments && comments.length}</h4>
        </div>
        </div>
    </div>
  )
}

export default Dashboard