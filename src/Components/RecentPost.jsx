import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";
import { useSelector } from "react-redux";
import defaulimg from "../assets/CryptoImg/6244967.jpg";
import Loading from "./Loading";

const RecentPost = ({searchQuery = ""}) => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const filteredPosts = post.filter((p) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
console.log("filteredPosts",filteredPosts);

  const formattedDate =  user?.createdAt 
  ? new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }) : "Date not available";

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
        {filteredPosts.length > 0 ? 
        (  filteredPosts.map((post, index) => {
            return (
              <div
                key={index}
                className={`${searchQuery ? 'md:w-[400px]':''} border border-gray-200  p-2 sm:p-2.5 `}
              >
                <div className="  ">
                  <a href="#">
                    <img
                      className=" h-[300px] sm:h-[240px] w-full object-fit "
                      src={`${BaseUrl}/images/${post.image}`}
                      alt=""
                    />
                  </a>
                </div>
                <div className="">
                  <button className="mt-3  font-medium text-[18px] text-orange-600  ">
                    Crypto Coin
                  </button>
                  <div
                    onClick={() => handleNavigate(post._id)}
                    className="flex justify-between items-center  hover:text-blue-700 cursor-pointer"
                  >
                    <h5 className="mb-1 text-[26px] font-semibold tracking-tight text-gray-900 hover:text-gray-400">
                      {post.title}
                    </h5>
                    <span className="flex items-center text-[18px] text-blue-700 hover:text-gray-400">
                      <span>Read more</span>
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
                    </span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: post?.desc }}
                    className="mb-1 font-light text-[23px] text-gray-700 dark:text-gray-400 text-ellips"
                  ></div>
                </div>
                <div className="my-3 grid grid-cols-[40px_auto] gap-2 pt-4">
                  <div className="">
                    <div className=" w-[40px] h-[40px] ">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={user?.profile ? `${BaseUrl}/images/${user.profile}` : `https://placehold.co/800@3x.png`} 
                        alt={user?.FullName || "User profile"}
                      />
                    </div>
                  </div>
                  <div className="self-center">
                    <h3 className="text-[18px] font-medium text-black">
                      {user?.FullName || "NA"}
                    </h3>
                    <h3 className="text-gray-600 text-[16px] ">
                      {formattedDate}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })) : (<Loading/>)}
      </div>
    </div>
  );
};

export default RecentPost;
