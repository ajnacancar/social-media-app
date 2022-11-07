import React, { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createPost, updatePost } from "../features/post/postSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Post() {
  const {isSuccess} = useSelector((state)=>state.post)
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const [post, setPost] = useState(null)

  const formik = useFormik({
    
    initialValues: {
      text: location.state ? location.state.text : "",
    },
    onSubmit: async (values) => {
      if (image) {
        const url = await uploadImage(image);
        values.photo_url = url;
      }

        if(post){
          values.id = post.id
          dispatch(updatePost(values));
        }else{
          dispatch(createPost(values));
        }

        
          navigate("/profile")
        
        
      

    
    },
  });


  useEffect(()=>{
    if(location.state){
    setPost(location.state)
    }
  },[])

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "skaz4y31");

    try {
      setUploading(true);

      let res = await fetch(
        "https://api.cloudinary.com/v1_1/bookingapp/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploading(false);

      return urlData.url;
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1MB");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  return (
    <>
      <div className="lg:mt-5 lg:w-[900px] mx-auto">
        <div>
          <div className=" p-5 border-b border-gray-200">
            <h2 className="font-medium text-base mr-auto">
              Display Information
            </h2>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 xl:col-span-12">
                <div className="border border-gray-200 rounded-md p-5">
                  <div className="w-40 h-40 relative object-cover cursor-pointer mx-auto">
                    <img
                      className="rounded-md"
                      src={imagePreview ? imagePreview : (post ? post.photo_url : "")}
                      alt=""
                    />
                  </div>

                  <div className="w-40 mx-auto cursor-pointer relative mt-5">
                    <button className="button w-full bg-[#53C0FF] text-white cursor-pointer py-2 rounded-xl">
                      Change Photo
                    </button>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/png, image/jpeg"
                      onChange={(e) => validateImg(e)}
                      className="w-full cursor-pointer h-full top-0 left-0 absolute opacity-0"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-12 xl:col-span-12">
                <form onSubmit={formik.handleSubmit}>


                  <div className="mt-3">
                    <label>Description</label>
                    <div className="mt-2">
                      <textarea
                        className="w-full border bg-gray-100 mt-2 p-2 outline-none"
                        placeholder="Profile Description"
                        name="text"
                        value={formik.values.text}
                        onChange={formik.handleChange}
                      ></textarea>
                   
                    </div>
                  </div>


                  <button
                    type="submit"
                    className="button bg-[#53C0FF]  w-40  text-white mt-3 p-2 rounded-md"
                  >
                    Save post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post