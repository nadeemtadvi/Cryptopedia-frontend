import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";
import { HiMenu } from "react-icons/hi";
import { navbar } from "../Constant/constants";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = ({ setSearchQuery, searchQuery }) => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [toggleDrop, setToggleDrop] = useState(false);
  const handleToggleDrop = () => {
    setToggleDrop((prev) => !prev);
  };
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await post("/auth/logout");
      const data = res.data;
      console.log(data);
      if (res.status === 200) {
        navigate("/login");
        toast.success(data.message);
        dispatch(removeUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-screen-2xl mx-auto bg-white p-2 sm:p-4">
      <div className="md:flex justify-between items-center">
        <div className="flex sm:block items-center gap-2">
          <Link to={"/"}>
            <div className="text-black font-bold text-[1.5rem] uppercase">
              <span className="text-[#EB5B00]">{navbar.NAV_LOGO}</span>
              <span className="text-[#FFB200]">{navbar.NAV_LOGO_H}</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-between md:justify-normal md:gap-10">
          <div className="">
            <form className="my-4 sm:my-0 max-w-screen-md">
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
                  className="block w-full p-2 ps-10 text-[18px] font-light text-gray-900 border-b border-gray-200  focus:ring-[#001beb] focus:border-[#001beb] outline-none"
                  placeholder="Search"
                  required=""
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {!user ? (
            <Link to={"/login"}>
              <button className="p-[5px_8px_6px] md:p-[5px_28px_6px]  border border-[#001beb]  bg-[#001beb]  text-white text-[18px] font-light ">
                Sign in
              </button>
            </Link>
          ) : (
            <div className="Avatars relative">
              <img
                onClick={handleToggle}
                id="avatarButton"
                type="button"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full cursor-pointer object-cover"
                // src={`${BaseUrl}/images/${user.profile}` || `https://placehold.co/800@3x.png`}
                src={
                  user?.profile
                    ? `${BaseUrl}/images/${user.profile}`
                    : `https://placehold.co/800x800`
                }
                alt="User dropdown"
              />
              {toggle && (
                <div
                  id="userDropdown"
                  className="z-10  absolute translate-x-[-122px] translate-y-[26px] bg-white divide-y divide-gray-100  shadow w-44 "
                >
                  <div className="px-4 py-3 text-[18px] text-gray-900 dark:text-white">
                    <div className="text-gray-700">{user.FullName}</div>
                    <div className="font-medium truncate text-gray-700">{user.email}</div>
                  </div>
                  <ul
                    className="py-2 text-[18px] text-gray-700 dark:text-gray-200"
                    aria-labelledby="avatarButton"
                  >
                    {/* {console.log('role',user.role)} */}
                    {user.role == "admin" ? (
                      <li>
                        <div
                          onClick={() => handleToggleDrop()}
                          className=" px-4 py-2 hover:bg-gray-100 text-gray-700 flex justify-between items-center"
                        >
                          <span>Admin</span>
                          <IoIosArrowDown />
                        </div>
                        {toggleDrop && (
                          <div className=" px-4 py-2 text-gray-700">
                            <ul>
                              <li className="py-1 border-b text-gray-700 border-gray-200 dark:text-gray-200 hover:bg-gray-100 ">
                                <Link to={"/dashboard"}>Dashboard</Link>{" "}
                              </li>
                              <li className="py-1 border-b text-gray-700 border-gray-200 dark:text-gray-200 hover:bg-gray-100">
                                <Link to={"/dashboard/addpost"}>Add Post</Link>{" "}
                              </li>
                              <li className="py-1 border-b text-gray-700 border-gray-200 dark:text-gray-200 hover:bg-gray-100">
                                <Link to={"/dashboard/user"}>All User</Link>{" "}
                              </li>
                              <li className="py-1 border-b text-gray-700 border-gray-200 dark:text-gray-200 hover:bg-gray-100">
                                <Link to={"/dashboard/allpost"}>All Post</Link>{" "}
                              </li>
                            </ul>
                          </div>
                        )}
                      </li>
                    ) : (
                      ""
                    )}

                    <li>
                      <Link
                        to={`/profile/${id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 "
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Link
                      onClick={handleLogout}
                      className="block px-4 py-2 text-[18px] text-gray-700 hover:bg-gray-100 "
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
