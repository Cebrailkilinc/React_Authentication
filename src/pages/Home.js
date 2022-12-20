import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';



const Home = () => {

    const navigate = useNavigate();

    const exitUser = () => {
        localStorage.removeItem("userToken")
        navigate("/")
    }

    if (!localStorage.getItem("userToken")) {
        return <Login />
    }
    

    return (
        <>
            <div className='max-w-full px-20 py-4 flex items-center justify-between bg-red-200'>
                <div>
                    <h1 className='font-semibold '>Home</h1>
                </div>
                <ul className='flex items-center gap-10'>
                    <li className='text-gray-600 font-semibold'>Mevcut Kullanıcı :  Cebrail</li>
                    <li>
                        <button onClick={exitUser} className='bg-orange-600 text-white px-5 py-1 rounded-md font-semibold'>Exit</button>
                    </li>
                </ul>
            </div>
            <div className='w-full flex justify-center items-center py-20'>
                <h1 className='text-3xl font-semibold'>WELCOME TO HOME</h1>
            </div>
        </>
    )
}

export default Home