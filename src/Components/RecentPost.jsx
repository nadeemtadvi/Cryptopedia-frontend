import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";
import { useSelector } from "react-redux";

const RecentPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const user = useSelector((state) => state.auth.user);
  
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };

  const getpost = async () => {
    try {
      const res = await get("/blog/getpost");
      const data = res.data;
      setPost(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getpost();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-[repeat(_auto-fit,minmax(18rem,1fr)_)] gap-3 mb-24">
        {post &&
          post.map((post, index) => {
            return (
              <div
                key={index}
                className=" bg-white border border-gray-200  p-2 sm:p-2.5 "
              >
                <div className="  ">
                  <a href="#">
                    <img
                      className=" h-[160px] sm:h-[200px] w-full object-fit "
                      src={`${BaseUrl}/images/${post.image}`}
                      alt=""
                    />
                  </a>
                </div>
                <div className="">
                  <button className="mt-3  font-medium text-[15px] text-orange-600  ">
                    Crypto Coin
                  </button>
                  <div
                    onClick={() => handleNavigate(post._id)}
                    className="flex justify-between items-center  hover:text-blue-800 cursor-pointer"
                  >
                    <h5 className="mb-1 text-[23px] font-semibold tracking-tight text-gray-900 hover:text-blue-800">
                      {post.title}
                    </h5>
                    <svg
                      className="rotate-[-30deg] w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: post?.desc }}
                    className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-ellips"
                  ></div>
                </div>
                <div className="my-3 grid grid-cols-[40px_auto] gap-2">
                  <div className="">
                    <div className=" w-[40px] h-[40px] ">
                      <img
                        className="object-cover rounded-full"
                        src={`${BaseUrl}/images/${user.profile}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="self-center">
                    <h3 className="text-[13px] font-medium text-black">
                      {user.FullName}
                    </h3>
                    <h3 className="text-gray-600 text-[12px] ">
                      {formattedDate}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecentPost;
