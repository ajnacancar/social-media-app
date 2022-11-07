import React from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useEffect } from "react";

function Login() {
  const {
    isError: stateError,
    isSuccess,
    message,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .email("This is not format of email"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <div>
      <div className="flex justify-center w-full items-center">
        <div className="container px-6 py-24 h-full lg:w-[900px]">
          <div className="flex lg:justify-between justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-6">
              <form onSubmit={registerFormik.handleSubmit}>
                <div className="mb-6">
                  <input
                    type="text"
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

                  {stateError && (
                    <p className="text-red-500 text-sm mt-5">
                      Wrong email or password
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <p>
                    Haven't account?{" "}
                    <Link
                      to={"/register"}
                      className="text-[#53C0FF] hover:underline capitalize"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-[#53C0FF] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-transparent hover:text-[#53C0FF] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full "
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
