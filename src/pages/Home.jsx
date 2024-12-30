import React from "react";
import RecentPost from "../Components/RecentPost";

const Home = ({searchQuery}) => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto ">
        <div className="p-2 sm:p-0 sm:max-w-[85%] mx-auto ">
        <div className="sm:flex justify-between items-center">
          <div className="my-5 sm:my-10 text-center  text-[1.9rem]  text-black font-medium">
            <span className="border-b border-orange-500 py-2 px-3">
              Latest Post
            </span>
          </div>
       
        </div>
          <div>
            <RecentPost searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
