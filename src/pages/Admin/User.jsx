import React, { useEffect, useState } from "react";
import { dele, get } from "../../services/Endpoint";
import toast from "react-hot-toast";

const User = () => {
  const [Users, setUsers] = useState([]);
  const [LoadData, setLoadData] = useState(false);

  const handleDelete = async (userId) => {
    const confirmMsg = window.confirm("Are you want to delete this user");

    if (confirmMsg) {
      try {
        const res = await dele(`/dashboard/deleteuser/${userId}`);
        const data = res.data;

        if (data.success) {
          toast.success(data.message);
          setLoadData(!LoadData);
        } else {
          toast.error("Failed to delete the user.");
        }
      } catch (error) {
        console.log(error);
        
        toast.error("Error deleting user:");
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await get("/dashboard/users");
        const data = res.data;
        setUsers(data.Users);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [LoadData]);

  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <div className="w-full max-w-4xl">
          <h4 className="text-[1.5rem] mb-4"><span className="py-1 px-1 border-b-2 border-sky-600">User</span></h4>

          <table className="w-full text-left">
            <thead>
              <tr className=" text-black !font-medium border-b border-gray-300">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {Users &&
                Users.map((user, index) => (
                  <tr
                    key={user.id}
                    className=" text-gray-700 border-b border-gray-300"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.FullName}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white  py-1 px-3 rounded-[6px] flex items-center"
                        onClick={() => handleDelete(user._id)}
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
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
