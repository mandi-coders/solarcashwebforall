import { faLock, faPassport, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios";
import APIs from '../../API/API'


function Login() {

    const [PhoneNo, setPhoneNo] = useState("")
    const [Password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()


    const LoginPress = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (PhoneNo.length === 0 || Password.length === 0) {
            toast.error("Please fill both fields");
            return;
        }
       
        try {
        setLoading(true);
            const {data:response} = await axios.post(APIs.Login.path, {
                phone_number : PhoneNo,
                password : Password,
                device_name: "Web"
            });
            localStorage.setItem('token', response.data.token)

            toast.success("Login Successful")
            navigate('/home')
          } catch (error) {
            toast.error(error.response.data.message);
            setErrorMessage(
              error.response?.data?.message || "An error occurred. Please try again."
            );
          } finally {
            setLoading(false);
          }
        }

useEffect(()=>{
    if(localStorage.getItem('token')){
        navigate('/home')
        }
},[])

    return (
        <div className='relative h-[100vh] w-[100%] ' >
            <div className='absolute h-[45vh] w-[100%] bg-blue-600 top-0 z-10 '>
                <img src="/assets/backgroung-login.gif" alt="" className='h-full w-full' />
            </div>
            <div className='absolute h-[65vh] w-[100%] bg-white  bottom-0 px-10 rounded-t-[50px] py-10 z-10'>
                <h1 className='text-2xl text-blue-500 text-center font-extrabold font-[Century] ' >Log In</h1>
                <form onSubmit={LoginPress} >
                    <div className='flex mb-1 border-b-2 border-gray-400 items-center gap-5 px-1 mt-10'>
                        <FontAwesomeIcon icon={faPhone} className='text-2xl text-blue-600' />
                        <input
                            type="text"
                            placeholder="Phone"
                            id='Phone'
                            name='Phone'
                            onChange={(e) => {
                                setPhoneNo(e.target.value)
                            }
                            }
                            value={PhoneNo}
                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent'
                        />
                    </div>
                    <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1 mt-5'>
                        <FontAwesomeIcon icon={faLock} className='text-2xl text-blue-600' />
                        <input
                            type="password"
                            placeholder="Password"
                            id='Password'
                            name='Password'
                            onChange={(e) => {
                                setPassword(e.target.value
                                )}}
                            value={Password}

                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent'
                        />
                    </div>
                    <div className='flex justify-end' >
                    <Link to={"/ForgotPassEmail"} className='text-sm text-blue-500 font-normal' >Forgot Password?</Link>
                </div>
                <div className='flex justify-center mt-16' >
                    <button type='submit' className='bg-blue-600 text-white py-3 w-[90%] rounded-2xl hover:bg-blue-700'>{loading?"Loading..." : "Login"}</button>
                </div>
                </form>
                
                <div className='flex justify-center gap-1 mt-4' >
                    <h1 className='text-sm text-gray-600 ' >New to Power Account? </h1>
                    <Link to={"/Register"} className='text-sm text-blue-500 font-normal' > Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login