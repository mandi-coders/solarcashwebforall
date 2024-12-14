import React, { useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPeopleGroup, faPhone, faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import APIs from '../../API/API'

interface User {
    name: string;
    phone: string;
    refer_code: string;
    email: string;
    upi: string | null; // UPI can be null or a string
  }

function UserProfile() {
  
    const [user, setUser] = useState<User>({
        name: '',
        phone: '',
        refer_code: '',
        email: '',
        upi: null
    })
    const tokan = localStorage.getItem("token")


   useEffect(() => {
    let config = {
        method: APIs.UserProfile.method,
        maxBodyLength: Infinity,
        url: APIs.UserProfile.path,
        headers: { 
          'Accept': 'application/json', 
          'Authorization':`Bearer ${tokan}` 
        }
      };
      
      axios.request(config)
      .then((response) => {
        setUser(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
   }, [])
   



    return (
        <div>
            <InnerPageHeading title={"Profile"} />
            <div className='justify-center flex  mb-1 mt-6 '  >
            <img src="\assets\privacy.png" className=" w-[90px] text-blue-800 " />
            </div>
            <div className='text-center'>
                <p className='text-[17px] font-bold'>{user?.name?user.name:"User"}</p>
                <p className='text-gray-700 text-[15px]'>{user?.email?user.email:"xyz@gmail.com"}</p>
                <Link to={'/ChangePassword'} className='text-blue-600 font-semibold'>Change Password</Link>
            </div>
            <div className='px-5 py-4 mt-2' >
                <h1 className='font-semibold text-blue-800 text-[19px]' >Profile Infomation</h1>
                <div className='bg-[#d5dbe2de] py-2 px-4 mt-3 rounded-lg' >
                    <form>
                        <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-4 px-1'>
                            <FontAwesomeIcon icon={faUserLarge} className='text-xl text-blue-800' />
                            {/* <input type="text" placeholder="Name" className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' /> */}
                            <h1 className='w-full py-2 px-2 bg-transparent text-[16px] text-gray-600'>{user?.name?user.name:"User"}</h1>
                        </div>
                        <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1'>
                            <FontAwesomeIcon icon={faEnvelope} className='text-xl text-blue-800' />
                            {/* <input type="text" placeholder="E-mail" className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' /> */}
                            <h1 className='w-full py-2 px-2 bg-transparent  text-[16px] text-gray-600'>{user?.email?user.email:"xyz@gmail.com"}</h1>

                        </div>
                        <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1'>
                            <FontAwesomeIcon icon={faPhone} className='text-xl text-blue-800' />
                            {/* <input type="text" placeholder="Phone" className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' /> */}
                            <h1 className='w-full py-2 px-2 bg-transparent  text-[16px] text-gray-600'>{user?.phone?user.phone:"+91 0000 0000"}</h1>

                        </div>
                        <div className='flex mb-4 border-b-2 border-gray-400 items-center gap-5 px-1'>
                            <FontAwesomeIcon icon={faPeopleGroup} className='text-xl text-blue-800' />
                            {/* <input type="text" placeholder="Name" className=' outline-none rounded-md w-full py-2 px-2 bg-transparent' /> */}
                            <h1 className='w-full py-2 px-1 bg-transparent  text-[16px] text-gray-600'>{user?.refer_code?user.refer_code:"XXXXXX"}</h1>

                        </div>
                    </form>
                </div>
                {/* <div className='mt-4 ml-2' >
                    <Link to={"/ChangePassword"} className='font-semibold text-zinc-600 text-sm '>Press here to Update Password</Link>
                </div>
                <div className='flex justify-center mt-8' >
                    <button className='bg-blue-600 text-white py-3 px-12 rounded-2xl hover:bg-blue-700'>Submit</button>
                </div> */}

            </div>
        </div>
    )
}

export default UserProfile