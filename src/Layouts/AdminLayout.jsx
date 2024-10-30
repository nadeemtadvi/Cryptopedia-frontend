import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="grow p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
