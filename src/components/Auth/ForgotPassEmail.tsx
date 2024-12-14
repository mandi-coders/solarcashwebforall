import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import APIs from '../../API/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faAt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function ForgotPassEmail() {
    const [Email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const LoginPress = async (e) => {
        e.preventDefault();
     
        if (Email.length === 0 ) {
            toast.error("Please fill Email");
            return;
        }
       
        try {
        setLoading(true);

            const {data:response} = await axios.post(APIs.ForgotEmail.path, {
                email : Email,
            });
            if(response.success){
                toast.success("Please Check Your Email")
                navigate('/otp',{
                    state:Email
                })
            }
          } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
  return (
    <div className='relative h-[100vh] w-[100%] ' >
    <div className='absolute h-[45vh] w-[100%] bg-blue-600 top-0 z-10 '>
    <FontAwesomeIcon onClick={()=>navigate(-1)} icon={faArrowLeft} className='absolute top-2 left-2 text-xl bg-white h-5 w-5 text-blue-500 shadow-lg shadow-black rounded-full p-2'  />
        <img src="/assets/forgotpassEmail.jpg" alt="" className='h-full w-full' />
    </div>
    <div className='absolute h-[55vh] w-[100%] bg-white  bottom-0 px-10 py-2 z-10'>
        <h1 className='text-2xl text-blue-500' >Forgot</h1>
        <h1 className='text-2xl text-blue-500' >password ?</h1>
        <h1 className='text-sm text-gray-600 mt-3' >Reset it now to regain access to your account quickly and securely!</h1>
        <form onSubmit={LoginPress} >
            <div className='flex mb-1 border-b-2 border-gray-400 items-center gap-5 px-1 mt-10'>
                <FontAwesomeIcon icon={faAt} className='text-xl font-extralight text-blue-600' />
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    id='Email'
                    name='Email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }
                    }
                    value={Email}
                    className=' outline-none rounded-md w-full py-2 px-2 bg-transparent'
                />
            </div>
        <div className='flex justify-center mt-8' >
            <button type='submit' className='bg-blue-600 text-white py-3 w-[95%] rounded-xl hover:bg-blue-700'>{loading?"Submiting..." : "Submit"}</button>
        </div>
        </form>
    </div>
</div>
  )
}

export default ForgotPassEmail