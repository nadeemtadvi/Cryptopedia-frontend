import React, { useEffect, useState } from "react";
import { BaseUrl, dele, get } from "../../services/Endpoint";
import toast from "react-hot-toast";

const Allpost = () => {
  const [post, setPost] = useState([]);
  const [loadedata,setLoadedata]=useState(false)

  const handleDelete = async (postId) => {
    const confirmMsg = window.confirm("Are you want to delete this post");

    if (confirmMsg) {
      try {
        const res = await dele(`/blog/delete/${postId}`);
        const data = res.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata);
        } else {
          toast.error("Failed to delete the user.");
        }
      } catch (error) {
        console.log(error);

        toast.error("Error deleting user:");
      }
    }
  };
  const handleUpdate = () => {
    alert("hello update");
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await get("blog/getpost");
        const data = res.data;
        setPost(data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [loadedata]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-[12px] sm:!pt-0 sm:p-5">
      {" "}
      {post &&
        post.map((item) => {
          return (
            <div key={item.id} className="">
              <div className="max-w-sm bg-white  border border-gray-200 p-1.5 sm:p-2  overflow-hidden">
                <img
                  src={`${BaseUrl}/images/${item.image}`}
                  alt="Blog"
                  className="w-full h-[160px] sm:h-[200px] object-fit "
                />
                <div className="mt-2 sm:mt-0 sm:py-2">
                  <h3 className="text-[18px] font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-[16px] mb-4 text-ellips">{item.desc}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-[#E4003A] hover:bg-red-700 text-white p-[3px_16px_4px]  flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm3 9a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-4 0a1 1 0 011-1h2a1 1 0 110 2H6a1 1 0 01-1-1zm7 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete hi
                    </button>
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="bg-[#FFB200] hover:bg-[#ffc53e] text-white font-semibold p-[3px_16px_4px]  flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 010 2.828l-8.828 8.828-2.828.707a1 1 0 01-1.213-1.213l.707-2.828 8.828-8.828a2 2 0 012.828 0zM5 11v2h2l7-7-2-2-7 7zM4 16h12v2H4v-2z" />
                      </svg>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Allpost;
