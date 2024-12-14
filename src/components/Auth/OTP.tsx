import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import APIs from '../../API/API';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faAt } from '@fortawesome/free-solid-svg-icons';
import OtpInput from 'react-otp-input';


function OTP() {
    const [OTP, setOTP] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()    
    const LoginPress = async (e) => {
        e.preventDefault();

        if (OTP.length === 0) {
            toast.error("Please fill OTP");
            return;
        }
        try {
            setLoading(true);
            const { data: response } = await axios.post(APIs.OTP.path, {
                otp: OTP,
                email: location.state
            });
            if(response.success){
                navigate('/ConfirmPass',{
                    state:response?.data?.tempToken
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
            <div className='absolute h-[45vh] w-[100%] bg-white top-0 z-10 flex justify-center items-end'>
            <FontAwesomeIcon onClick={()=>navigate(-1)} icon={faArrowLeft} className='absolute top-2 left-2 text-xl bg-white h-5 w-5 text-blue-500 shadow-lg shadow-black rounded-full p-2'  />
                <img src="/assets/otp.jpg" alt="" className='h-full w-full' />
            </div>
            <div className='absolute h-[55vh] w-[100%] bg-white  bottom-0 px-10 pt-10 z-10'>
                <h1 className='text-2xl text-blue-500' >Enter OTP</h1>
                <h1 className='text-sm text-gray-600 mt-3' >An 4 digit code has been sent to your Email Address associated with your account.</h1>
                <form onSubmit={LoginPress} >
                        <OtpInput
                            value={OTP}
                            onChange={setOTP}
                            numInputs={6}
                            shouldAutoFocus
                            inputStyle={{
                                width:"40px",
                                height:"40px",
                                borderRadius:"2px",
                                color:"black",
                                border:"1px solid blue",
                                fontSize:"25px"
                            }}
                            placeholder='------'
                            containerStyle={{
                                alignItems:"center",
                                display:"flex",
                                justifyContent:"center",
                                gap:"5px",
                                marginTop:"25px"
                            }}
                            renderSeparator={<span> </span>}
                            renderInput={(props) => <input {...props} style={{ ...props.style, color: 'black' }} />}
                        />
                    <div className='flex justify-center mt-14' >
                        <button type='submit' className='bg-blue-600 text-white py-3 w-[95%] rounded-xl hover:bg-blue-700'>{loading ? "Verifying..." : "Verify"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OTP