import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";
import { HiMenu } from "react-icons/hi";
import { navbar } from "../Constant/constants";

const Navbar = () => {
  const {id} = useParams()
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
const [toggle, setToggle] = useState(false)

const handleToggle = () => {
  setToggle((prev) => !prev)
}

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
      <div className="flex justify-between items-center">
        <div className="flex sm:block items-center gap-2">
          <div className="sm:hidden block">
            <HiMenu className="text-[27px]"/>
          </div>
          <Link to={"/"}>
            <div className="text-black font-bold text-[1.5rem] uppercase">
              <span className="text-[#EB5B00]">{navbar.NAV_LOGO}</span><span className="text-[#FFB200]">{navbar.NAV_LOGO_H}</span>
            </div>
          </Link>
        </div>
        <div className="hidden sm:block">
          <ul className="flex justify-between items-center gap-8 text-black">
            {navbar.NAVITEMS.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {!user ? (
            <Link to={"/login"}>
              <button className="p-[5px_28px_6px]    bg-[#001beb]  text-white font-semibold ">
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
                src={`${BaseUrl}/images/${user.profile}`}
                alt="User dropdown"
              />
              {toggle && 
              <div
                id="userDropdown"
                className="z-10  absolute translate-x-[-122px] translate-y-[26px] bg-white divide-y divide-gray-100  shadow w-44 "
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{user.FullName}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  {/* {console.log('role',user.role)} */}
                  {user.role == "admin" ? (
                    <li>
                      <Link
                        to={"/dashboard"}
                        className="block px-4 py-2 hover:bg-gray-100 "
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  <li>
                    <Link
                      to={`/profile/${id}`}
                      className="block px-4 py-2 hover:bg-gray-100 "
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Sign out
                  </Link>
                </div>
              </div>}
            </div>
          )}
          {/* */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
