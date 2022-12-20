import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "../validation/login";
import { fetchUserToken } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';



const Login = () => {


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, userToken, isSuccess,loading } = useSelector(state => state.user)
  console.log(userToken, isSuccess)



  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate('/home')
    } else {
      navigate('/')
    }
  }, [userToken, error, isSuccess, navigate, dispatch])



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        password: values.password
      }
      await dispatch(fetchUserToken(userData))
      // if (localStorage.getItem("userToken")) {
      //   navigate("/home")
      // }
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
            {formik.errors.email && formik.touched.email && <span className='text-red-500 text-xs italic'>{formik.errors.email}</span>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            <div className='h-6'>
              {formik.errors.password && formik.touched.password && <h1 className='text-red-600 text-xs'>{formik.errors.password}</h1>}
              {error && <h1 className='text-red-600 text-xs italic'>Email veya Password yanlış...</h1>}
            </div>
          </div>
         
          <div className="flex items-center justify-between mt-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <Link to={"/register"} className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
              Dont you have an account ?
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

export default Login
