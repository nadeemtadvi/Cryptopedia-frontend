import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const UserLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Outlet searchQuery={searchQuery}/>
      <Footer/>
    </>
  );
};

export default UserLayout;
