import React from "react";
import {RiSendPlaneFill} from 'react-icons/ri'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {commentPost} from '../features/post/postSlice'
import { useDispatch} from 'react-redux'
function AddComment({id}) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
            comment: ""
        },
        validationSchema: Yup.object({
            comment: Yup.string().required("Required")
        }),
        onSubmit: (values, { resetForm }) => {
              dispatch(commentPost({id:id, values:values}))
              resetForm()
        }
    })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter your comment.."
            className="outline-none p-4 text-zinc-500"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
          />
          <button type="submit" className="submit p-2 justify-center items-center flex">
            <RiSendPlaneFill className="w-5 h-5" />
          </button>
        </div>
      </form>
    </>
  );
}

export default AddComment;
