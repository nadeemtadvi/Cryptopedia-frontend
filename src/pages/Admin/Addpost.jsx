import React, { useState } from "react";
import toast from "react-hot-toast";
import { post } from "../../services/Endpoint";
import EditorTiny from "../../Components/EditorTiny";

const Addpost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Description before submit:", description);

    try {
      const formData = new FormData();
      if (image) {
        formData.append("postimage", image);
      }
      formData.append("title", title);
      formData.append("desc", description);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const res = await post("/blog/create", formData);
      const data = res.data;
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setImage(null);
        setDescription("");
        document.getElementById("image").value = "";
      } else {
        toast.error("Failed to create post. Try again.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className="w-full text-[20px] font-light bg-white  border border-gray-200 shadow-md p-2 sm:p-4"
        >
          <h2 className="text-[26px] font-medium text-center text-black mb-4">
            Add New Post
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700  mb-2" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full  border overflow-hidden   border-gray-200 text-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700  mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-3 py-2 border  border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#001beb]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700  mb-2" htmlFor="description">
              Description
            </label>
            <EditorTiny
              value={description}
              onEditorChange={(content) =>{ 
                console.log("Editor content:", content);
                setDescription(content)}} // Update the description state
            />
            {/* <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your post description here"
              className="w-full px-3 py-2 border  border-gray-200 focus:outline-none focus:ring-1 focus:ring[#001beb]"
              rows="4"
            /> */}
          </div>

          <button className="w-full bg-[#001beb] text-white py-2  font-light hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpost;
