import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import APIs from '../../API/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';

function ConfirmPass() {

    const [Pass, setPass] = useState("")
    const [ConfirmPass, setConfirmPass] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    
    const LoginPress = async (e) => {
        e.preventDefault();
        if (Pass.length === 0 || ConfirmPass.length === 0 ) {
            toast.error("Please fill both fields");
            return;
        }
        try {
        setLoading(true);

            const {data:response} = await axios.post(APIs.MakeNewPass.path, {
                token : location?.state,
                password : Pass,
                password_confirmation: ConfirmPass
            });
            if(response.success){
                toast.success("Password reset successfully")
                navigate('/')
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
    <div className='absolute h-[45vh] w-[100%] bg-green-500 top-0'>
    <FontAwesomeIcon onClick={()=>navigate(-1)} icon={faArrowLeft} className='absolute top-2 left-2 text-xl bg-white h-5 w-5 text-blue-500 shadow-lg shadow-black rounded-full p-2'  />
        <img src="/assets/forgotpass.jpg" alt="" className='h-full w-full' />
    </div>
    <div className='absolute h-[55vh] w-[100%] bg-white  bottom-0 px-10 py-2 z-10'>
        <h1 className='text-2xl text-blue-500 font-["Arial"] ' >Reset</h1>
        <h1 className='text-2xl text-blue-500 font-["Arial"] ' >password</h1>
        <h1 className='text-sm text-gray-600 mt-3' >Kindly create a strong and memorable password !</h1>
        <form onSubmit={LoginPress} >
            <div className='flex mb-1 border-b-2 border-gray-400 items-center gap-5 px-1 mt-6'>
                <FontAwesomeIcon icon={faLock} className='text-xl font-extralight text-blue-600' />
                <input
                    type="password"
                    placeholder="Password"
                    id='password'
                    name='password'
                    onChange={(e) => {
                        setPass(e.target.value)
                    }
                    }
                    value={Pass}
                    className=' outline-none rounded-md w-full py-2 px-2 bg-transparent'
                />
            </div>
            <div className='flex mb-1 border-b-2 border-gray-400 items-center gap-5 px-1 mt-4'>
                <FontAwesomeIcon icon={faLock} className='text-xl font-extralight text-blue-600' />
                <input
                    type="Password"
                    placeholder="Confirm Password"
                    id='ConfirmPass'
                    name='ConfirmPass'
                    onChange={(e) => {
                        setConfirmPass(e.target.value)
                    }
                    }
                    value={ConfirmPass}
                    className=' outline-none rounded-md w-full py-2 px-2 bg-transparent'
                />
            </div>
        <div className='flex justify-center mt-8' >
            <button type='submit' disabled={loading?true:false}  className='bg-blue-600 text-white py-3 w-[95%] rounded-xl hover:bg-blue-700'>{loading?"Changing..." : "Change Password"}</button>
        </div>
        </form>
    </div>
</div>
  )
}

export default ConfirmPass