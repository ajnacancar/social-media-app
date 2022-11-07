import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import person from "../assets/person-244.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../features/auth/authSlice";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

function EditUser() {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const editFormik = useFormik({
    initialValues: {
      last_name: user.user ? user.user.last_name : "",
      first_name: user.user ? user.user.first_name : "",
      username: user.user ? user.user.username : "",
      email: user.user ? user.user.email : "",
      user_photo_url: user.user ? user.user.user_photo_url : "",
      profile_description: user.user ? user.user.profile_description : "",
      profile_type: user.user ? user.user.profile_type : "",
    },
    validationSchema: Yup.object({
      last_name: Yup.string().required("Required"),
      first_name: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string()
        .required("Required")
        .email("This is not format of email"),
    }),
    onSubmit: async (values) => {
      if (image) {
        const url = await uploadImage(image);
        values.user_photo_url = url;
      }
      dispatch(updateUser(values));
      if (isSuccess) {
        window.location.replace("/profile")
      }
    },
  });

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

  const userDelete = () => {
    dispatch(deleteUser());
    navigate("/login");
  };
  return (
    <>
      <div className="lg:mt-5 lg:w-[900px] mx-auto">
        <div>
          <div className="flex items-center p-5 border-b border-gray-200">
            <h2 className="font-medium text-base mr-auto">
              Display Information
            </h2>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 xl:col-span-4">
                <div className="border border-gray-200 rounded-md p-5">
                  <div className="w-40 h-40 relative object-cover cursor-pointer mx-auto">
                    <img
                      className="rounded-md"
                      src={
                        imagePreview ||
                        (user.user && user.user.user_photo_url
                          ? user.user.user_photo_url
                          : person)
                      }
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

                <div className="flex justify-center">
                  <button
                    onClick={openModal}
                    className="button w-[70%] bg-red-700 text-white cursor-pointer py-2 rounded-xl mt-5"
                  >
                    Delete account
                  </button>
                </div>
              </div>

              <div className="col-span-12 xl:col-span-8">
                <form onSubmit={editFormik.handleSubmit}>
                  <div className="mt-3">
                    <label>First Name</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full border bg-gray-100 mt-2 p-2 outline-none"
                        placeholder="First Name"
                        name="first_name"
                        value={editFormik.values.first_name}
                        onChange={editFormik.handleChange}
                      />
                      {editFormik.errors ? (
                        <p className="text-red-500 text-sm">
                          {editFormik.errors.first_name}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label>Last Name</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full border bg-gray-100 mt-2 p-2 outline-none"
                        placeholder="Last Name"
                        name="last_name"
                        value={editFormik.values.last_name}
                        onChange={editFormik.handleChange}
                      />
                      {editFormik.errors ? (
                        <p className="text-red-500 text-sm">
                          {editFormik.errors.last_name}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label>Username</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full border bg-gray-100 mt-2 p-2 outline-none"
                        placeholder="Username"
                        name="username"
                        value={editFormik.values.username}
                        onChange={editFormik.handleChange}
                      />
                      {editFormik.errors ? (
                        <p className="text-red-500 text-sm">
                          {editFormik.errors.username}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label>Email</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full border bg-gray-100 mt-2 p-2 outline-none"
                        placeholder="Email"
                        name="email"
                        value={editFormik.values.email}
                        onChange={editFormik.handleChange}
                      />
                      {editFormik.errors ? (
                        <p className="text-red-500 text-sm">
                          {editFormik.errors.email}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label>Profile description</label>
                    <div className="mt-2">
                      <textarea
                        className="w-full border bg-gray-100 mt-2 p-2 outline-none"
                        placeholder="Profile Description"
                        name="profile_description"
                        value={editFormik.values.profile_description}
                        onChange={editFormik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label>Profile type</label>
                    <div className="mt-2">
                      <select
                        className="w-full border bg-gray-100 mt-2 p-2 outline-none"
                        placeholder="Profile Type"
                        name="profile_type"
                        value={editFormik.values.profile_type}
                        onChange={editFormik.handleChange}
                      >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="button bg-[#53C0FF]  w-20  text-white mt-3 p-2 rounded-md"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>Are you sure?</div>
        <form className="flex justify-between mt-5">
          <button onClick={() => userDelete()} className="text-green-600">
            Yes
          </button>
          <button onClick={closeModal} className="text-red-500">
            No
          </button>
        </form>
      </Modal>
    </>
  );
}

export default EditUser;
