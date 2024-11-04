import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl, get, post } from "../services/Endpoint";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Post = () => {
const {id} = useParams()
const [onPosts, setOnPost] = useState(null)
const [loaddata, setLoaddata] = useState(false);
const [comment, setComment] = useState("")
const user = useSelector((state) => state.auth.user);


const onSubmitComment = async(e) => {
  e.preventDefault()
  if(!user){
    toast.error('please login')
  }
  else{
    try {
      const res =await post('/comment/addcomment',{
        comment,
        id,
        userId:user._id,
      })
      const data = res.data
      console.log(data)
      setLoaddata((prev) => !prev)
      if(res.success){
        toast.success(res.message)
        setComment('')
      }
    } catch (error) {
      console.log(error)
      toast.error("An unexpected error occurred. Please try again.");

    }
  }

  
}


useEffect(() => {
  const singlePost = async () => {
    try {
      const res = await get(`/public/singlepost/${id}`)
      const data = res.data
      setOnPost(data.Post)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  singlePost()
},[loaddata,id])

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <div className="mt-[4rem]  text-black">
        <div className=" p-2 sm:p-0 sm:max-w-[70%] mx-auto mt-[1rem]">
        <h3 className="text-[1.42rem] mb-3 sm:text-[2rem] font-medium">{onPosts && onPosts?.title}</h3>
          <div className="blog-cover  overflow-hidden  sm:h-[386px] w-full">
            <img
              // src="https://img.freepik.com/free-photo/monstera-plant-green-pot_53876-145188.jpg?t=st=1729632583~exp=1729636183~hmac=8c19e3b3dd239db1617b974e750a5530dcfa025592b4f55971a62b54ca1ca5fc&w=740"
             src={onPosts && `${BaseUrl}/images/${onPosts.image}`}
              alt=""
              className="object-fill w-full"
            />
          </div>
          <div className="my-[1rem]">
          <div className="text-[1.3rem] font-normal" dangerouslySetInnerHTML={{ __html: onPosts?.desc }}></div>
            {/* <h5 >            {onPosts && onPosts.desc}            </h5> */}
          </div>
          <hr />
          <div className="my-[1rem]">
            <h5 className="text-[1.25rem] sm:text-[1.6rem] mb-3 font-medium">Leave a comment</h5>
            <form className="" action="" >
              <div>
                <div>
                  <label htmlFor="">Comment</label>
                </div>

                <textarea
                  className="my-2 w-full  p-3 border border-gray-200"
                  name=""
                  id=""
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here"
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={onSubmitComment}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#001beb]  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#001beb] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit Comment
              </button>
            </form>
            <hr className="my-5" />
            <h5 className="text-[1.25rem] sm:text-[1.6rem] mb-3 font-medium">comments</h5>
            {onPosts && onPosts.comments.map((comment) => {
              return(
                <div className="my-3">
                <div className="flex items-start gap-2.5">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    // src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?t=st=1729634952~exp=1729638552~hmac=ee1b2350b3dbdb3b95674d1a96c89c187adcdc9e3abbb77dbe67cc8a33310a77&w=740"
                    src={`${BaseUrl}/images/${comment.userId.profile}`}
                    alt="Jese image"
                  />
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {comment.userId.FullName}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        11:46
                      </span>
                    </div>
                    <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
                  
                      {comment.comment}
                    </p>
                  
                  </div>
                </div>
              </div>
              )
            })}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
