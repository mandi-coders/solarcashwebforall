import { faEnvelope, faLayerGroup, faLock, faMessage, faPeopleGroup, faPhone, faShareNodes, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import APIs from '../../API/API'
import { toast } from 'react-toastify'

function Register() {

    const [SearchPerms] = useSearchParams()

    const [PhoneNo, setPhoneNo] = useState("")
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [ReferralCode, setReferralCode] = useState("")
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate()


    useEffect(()=>{
        const code = SearchPerms.get("r")
        if(code) {
            setReferralCode(code)
        }
    },[SearchPerms])

    const HendalRegister = async (e) => {
        e.preventDefault();

        if (
            PhoneNo.length === 0 ||
            Password.length === 0 ||
            ConfirmPassword.length === 0 ||
            Email.length === 0 ||
            Name.length === 0
        ) {
            toast.error("Please fill all fields");
            return;
        }
        setLoading(true);
        setErrorMessage("");
        try {
            const { data: response } = await axios.post(APIs.Register.path, {
                name: Name,
                email: Email,
                phone_number: PhoneNo,
                password: Password,
                confirm_password: ConfirmPassword,
                refer_code: ReferralCode !== "" ? ReferralCode : undefined

            })
            if (response.success) {
                toast.success("Login Successful")
                return navigate("/login")
            }

            toast.error(response.message)
        }
        catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response);
            setErrorMessage(
                error.response?.data?.message || "An error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='h-[100vh] bg-slate-950 w-[100%] px-2' >
            <div className='flex flex-col justify-center items-center rounded-b-[30px] bg-zinc-800 h-[13vh] ' >
                <h1 className='text-blue-600 text-xl text-center font-semibold'>Sign up</h1>
                <h1 className='text-sm text-white text-center  font-normal' >Let's Start to Earn </h1>
            </div>
            <div className='w-[100%] bg-white h-[85vh]  px-10 rounded-t-[30px] py-10 z-10 mt-3'>
                <form onSubmit={HendalRegister} >
                    <div className='flex mb-1 border-b-2 border-gray-400 items-center gap-5 px-1 mt-5'>
                        <FontAwesomeIcon icon={faPhone} className='text-xl text-blue-600' />
                        <input
                            type="tel"
                            value={PhoneNo}
                            onChange={(e) => { setPhoneNo(e.target.value) }}
                            placeholder="Phone no."
                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' />
                    </div>
                    <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1 mt-5'>
                        <FontAwesomeIcon icon={faEnvelope} className='text-xl text-blue-600' />
                        <input
                            type="email"
                            value={Email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder="Enter Your Email"
                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent'
                        />
                    </div>
                    <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1 mt-5'>
                        <FontAwesomeIcon icon={faUser} className='text-xl text-blue-600' />
                        <input
                            type="text"
                            value={Name}
                            onChange={(e) => { setName(e.target.value) }}
                            placeholder="Enter Your User Name"
                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent'
                        />
                    </div>
                    <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1 mt-5'>
                        <FontAwesomeIcon icon={faLock} className='text-xl text-blue-600' />
                        <input
                            type="password"
                            value={Password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            placeholder="Your Password"
                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' />
                    </div>
                    <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1 mt-5'>
                        <FontAwesomeIcon icon={faLock} className='text-xl text-blue-600' />
                        <input
                            type="password"
                            value={ConfirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            placeholder="Confirm Password "
                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' />
                    </div>
                    <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1 mt-5'>
                        <FontAwesomeIcon icon={faShareNodes} className='text-xl text-blue-600' />
                        <input
                            type="text"
                            value={ReferralCode}
                            onChange={(e) => { setReferralCode(e.target.value) }}
                            placeholder="Your Referral Code"
                            className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' />
                    </div>
                    <div className='flex justify-center mt-16' >
                        <button type='submit' className='bg-blue-600 text-white py-3 w-[90%] rounded-2xl hover:bg-blue-700'>
                            {
                                loading ? "Loading..." : "Sign Up"
                            }
                        </button>
                    </div>
                </form>

                <div className='flex justify-center gap-1 mt-4' >
                    <h1 className='text-sm text-gray-600 ' >Already have an Account? </h1>
                    <Link to={"/login"} className='text-sm text-blue-500 font-semibold' >Login</Link>
                </div>
            </div>

        </div>
    )
}

export default Register