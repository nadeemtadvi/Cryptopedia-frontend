import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullname: "",
    email: "",
    password: "",
    image: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData =new FormData();
    formData.append('FullName',value.fullname)
    formData.append('email',value.email)
    formData.append('password',value.password)
    formData.append('profile',value.image)

    try {
      const res = await post("/auth/register", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;
      if (data.success) {
        console.log(data.message);
        navigate("/login");
        toast.success(data.message);
      }
      console.log("register API", data);
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  const handleImageClick = () => {
    document.getElementById("image").click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({
      ...value,
      image: file,
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      {" "}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create an account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Profile Picture placeholder */}
            <div className="mb-4">
              <div className="flex justify-center ">
                <img
                  // src="https://img.freepik.com/free-photo/artist-white_1368-3543.jpg?t=st=1729824641~exp=1729828241~hmac=55a2a499d4aa27410a389f16720acf05aa70ebc9e3e3c0257ba502d6ba3a52b5&w=740"
                  src={
                    value.image
                      ? URL.createObjectURL(value.image)
                      : "https://via.placeholder.com/150"
                  }
                  className="object-cover w-20 h-20 rounded-full cursor-pointer"
                  onClick={handleImageClick}
                />
              </div>
              <input
                type="file"
                className="form-control d-none" // Hide the file input
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                value={value.fullname}
                onChange={(e) =>
                  setValue({ ...value, fullname: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12v2a4 4 0 11-8 0v-2m8 0a4 4 0 00-8 0v2m0 0a4 4 0 118 0v-2m-4-6v.01M12 5a7 7 0 110 14A7 7 0 0112 5z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
            >
              Sign up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
