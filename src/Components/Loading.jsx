import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index}>
            <div className={` bg-white  p-2 sm:p-2.5`}>
              <div className="w-full h-[180px] bg-gray-300 animate-pulse "></div>
              <div>
                <h5 className="my-4 bg-gray-300 animate-pulse h-[24px]"></h5>
              </div>
              <div className=" grid grid-cols-[40px_auto] gap-2">
                <div>
                  <div className="w-[40px] h-[40px] bg-gray-300 animate-pulse rounded-full"></div>
                </div>
                <div className="self-center">
                  <h3 className="bg-gray-300 animate-pulse w-[100px] h-[10px] mb-2"></h3>
                  <h3 className="bg-gray-300 animate-pulse w-[100px] h-[10px]"></h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
