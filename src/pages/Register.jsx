import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../features/auth/authSlice'



function Register() {
  const [confimPassword, setConfimPassword] = useState("");
  const [error, setError] = useState(false);
  const { error: stateError, isSuccess, message} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const checkPasswords = (value) => {
    if (registerFormik.values.password !== value) {
      setError(true);
    } else {
      setError(false);
      setConfimPassword(value)
    }
  };
  const registerFormik = useFormik({
    initialValues: {
      last_name: "",
      first_name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      last_name: Yup.string().required("Required"),
      first_name: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string()
        .required("Required")
        .email("This is not format of email"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if(values.password === confimPassword){
            dispatch(register(values))

            if(isSuccess){
              navigate("/login")
            }
      }
    },
  });
  return (
    <div>
      <div className="flex justify-center w-full items-center">
        <div className="container px-6 py-24 h-full lg:w-[900px]">
          <div className="flex lg:justify-between justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-6">
              <form onSubmit={registerFormik.handleSubmit}>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="First name"
                    name="first_name"
                    value={registerFormik.values.first_name}
                    onChange={registerFormik.handleChange}
                  />
                  {registerFormik.errors ? (
                    <p className="text-red-500 text-sm">
                      {registerFormik.errors.first_name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Last name"
                    name="last_name"
                    value={registerFormik.values.last_name}
                    onChange={registerFormik.handleChange}
                  />
                  {registerFormik.errors ? (
                    <p className="text-red-500 text-sm">
                      {registerFormik.errors.last_name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Username"
                    name="username"
                    value={registerFormik.values.username}
                    onChange={registerFormik.handleChange}
                  />
                  {registerFormik.errors ? (
                    <p className="text-red-500 text-sm">
                      {registerFormik.errors.username}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    name="email"
                    value={registerFormik.values.email}
                    onChange={registerFormik.handleChange}
                  />
                  {registerFormik.errors ? (
                    <p className="text-red-500 text-sm">
                      {registerFormik.errors.email}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    name="password"
                    value={registerFormik.values.password}
                    onChange={registerFormik.handleChange}
                  />
                  {registerFormik.errors ? (
                    <p className="text-red-500 text-sm">
                      {registerFormik.errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Confirm password"
                    onChange={(e) => checkPasswords(e.target.value)}
                  />
                  {error ? (
                    <p className="text-red-500 text-sm">
                      Must be same password!
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-6">
                  <p>
                    Already have account?{" "}
                    <Link
                      to={"/login"}
                      className="text-[#53C0FF] hover:underline capitalize"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-[#53C0FF] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-transparent hover:text-[#53C0FF] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full "
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
