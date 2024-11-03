import React from "react";
import RecentPost from "../Components/RecentPost";

const Home = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        
        <div className="p-2 sm:p-0 sm:max-w-[85%] mx-auto ">
        <div className="sm:flex justify-between items-center">
          <div className="my-5 sm:my-10 text-center  text-[1.25rem] sm:text-[1.6rem] text-black font-medium">
            <span className="border-b border-orange-500 py-2 px-3">
              Latest Post
            </span>
          </div>
          <form className="my-4 sm:my-0">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300  focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        </div>
          <div>
            <RecentPost />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
