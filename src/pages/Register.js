import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useFormik, } from "formik";
import validationSchema from "../validation/register";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRegister } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner"

const Register = () => {
  const { userToken, isSuccess, error, loading } = useSelector(state => state.user)

  const navigate = useNavigate()

  const dispatch = useDispatch();
  console.log(userToken, error, isSuccess)


  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate('/home')
    } 
  }, [userToken, error, isSuccess, navigate, dispatch])

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      passwordConfirm: "",

    },

    validationSchema,
    onSubmit: async (values,) => {
      const userRegisterData = {
        userName: values.userName,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      }
      dispatch(fetchUserRegister(userRegisterData))
      if (localStorage.getItem("userToken")) {
        navigate("/home")
      }
    }
  })

  if (loading) {
    return <Spinner/>
  }

  return (
    <div className='w-full h-screen px-28 flex items-center justify-center'>
      <div className="w-full max-w-xs">
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
              Username
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id='userName' placeholder="Username" />

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" />
            {formik.errors.email && formik.touched.email && <span className='text-red-500 text-xs italic'>{formik.errors.email}</span>}

          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            {formik.errors.password && formik.touched.password && <span className='text-red-500 text-xs italic'>{formik.errors.password}</span>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password Confirm
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="passwordConfirm" type="password" placeholder="******************" />
            {formik.errors.passwordConfirm && formik.touched.passwordConfirm && <span className='text-red-500 text-xs italic'>{formik.errors.passwordConfirm}</span>}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
            <Link to={"/"} className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
              Login if you have an account
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Register
