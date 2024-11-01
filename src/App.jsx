import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserLayout from "./Layouts/UserLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminLayout from "./Layouts/AdminLayout";
import Addpost from "./pages/Admin/Addpost";
import User from "./pages/Admin/User";
import Allpost from "./pages/Admin/Allpost";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<Post />}></Route>
            <Route path="profile/:id" element={<Profile />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="addpost" element={<Addpost />} />
            <Route path="allpost" element={<Allpost />} />
            <Route path="user" element={<User />} />
          </Route>
       
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
