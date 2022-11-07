import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { useFormik } from "formik";
import CardProfile from "../components/CardProfile";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../features/auth/authSlice";
import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";
import { CgDanger } from "react-icons/cg";
function Search() {
  const { users, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      dispatch(search(values.search));
    },
  });

  return (
    <>
      <div className="w-full my-10 flex justify-center ">
        <div className="h-full">
          <div className="h-full">
            <div className="mb-10">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center justify-center">
                  <input
                    onChange={formik.handleChange}
                    name="search"
                    className="outline-2 border-2 border-[#53C0FF] outline-[#53C0FF] p-2 mr-5 rounded text-lg text-zinc-500"
                    type="text"
                    placeholder="Search"
                  />
                  <button type="submit" className="text-[#53C0FF] p-2">
                    <RiSearchLine className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {isLoading ? (
              <div className="mt-20">
                <ReactSpinner />
              </div>
            ) : (
              <>
                {users && users.length > 0 ? (
                  <div className="grid lg:grid-cols-4 gap-3">
                    {users &&
                      users.map((user, index) => (
                        <CardProfile key={index} user={user} />
                      ))}
                  </div>
                ) : (
                  <div className="pt-8">
                    <div className="w-full flex justify-center">
                      <CgDanger className="w-28 h-28 lg:w-44 lg:h-44 text-zinc-400" />
                    </div>
                    <div className="text-center">
                      <h1 className="lg:text-2xl text-xl mt-2 font-medium text-gray-600">This user could not be found</h1>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
