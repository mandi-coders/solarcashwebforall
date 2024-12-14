import React, { useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import APIs from '../../API/API';
import axios from 'axios';


function Share() {
    const tokan = localStorage.getItem("token")
    const [user, setUser] = useState({
        refer_code: '',
      })

    useEffect(() => {
        let config = {
          method: APIs.UserProfile.method,
          maxBodyLength: Infinity,
          url: APIs.UserProfile.path,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokan}`
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

    const copyLink = () => {
        toast.success("Code Copied")
    }
    return (
        <div className=' min-h-[100vh]  w-full py-4'>
            {/* <InnerPageHeading  title={"Share"}/> */}
            <div className="relative w-fit mx-auto">
                <h1
                    className="text-center cursor-pointer font-semibold text-xl py-2 bg-blue-500 text-white rounded-tl-xl rounded-br-xl w-fit px-4 mx-auto" >
                    Click To Copy The Reffer Code
                </h1>
                <CopyToClipboard text={user.refer_code} onCopy={copyLink} >
                <button
                    className="absolute bg-transparent top-0 left-0 right-0 bottom-0"
                    style={{ opacity: 0.3, pointerEvents: 'auto' }}
                ></button>
                </CopyToClipboard>
            </div>


            <div className='px-4 py-4 mt-4 flex flex-col gap-10 mb-10' >
                <div className='bg-gradient-to-r from-white to-blue-500  p-2 rounded-xl shadow-xl flex justify-end w-[90%] mx-auto  relative' >
                    <img src="\assets\oneShare.jpg" alt="" className='w-[50px] absolute -left-3 -top-3 ' />
                    <p className=' text-[18px] w-[90%] font-normal'><span className='bg-[#4488F7] font-serif text-lg text-white' >10%</span> - If you directly share the link with someone and they purchase a plan, you will receive 10% of the plan's cost as a referral reward.</p>
                </div>
                <div className='bg-gradient-to-r from-white to-[#CFA569] p-2 rounded-xl shadow-xl flex justify-end w-[90%] mx-auto  relative' >
                    <img src="\assets\twoShare.jpg" alt="" className='w-[50px] absolute -left-3 -top-3' />
                    <p className=' text-[18px] w-[90%] font-normal'>  <span className='bg-[#CFA569] font-serif text-lg text-white' >4%</span>- If the person you shared the link with further shares it and the second-level user purchases a plan, you will receive 6% of the plan's cost as a referral reward.</p>
                </div>
                <div className='bg-gradient-to-r from-white to-[#E64010]  p-2 rounded-xl shadow-xl flex justify-end w-[90%] mx-auto  relative' >
                    <img src="\assets\threeShare.jpg" alt="" className='w-[50px] absolute -left-3 -top-3' />
                    <p className=' text-[18px] w-[90%] font-normal'> <span className='bg-[#E64010] font-serif text-lg text-white' >2%</span> -For the Third-level referral and all subsequent levels, you will receive 2% of the plan's cost as a referral reward for every plan purchased.</p>
                </div>
                {/* <div className='bg-gradient-to-r from-white to-[#B3DA3F]  p-2 rounded-xl shadow-xl flex justify-end w-[90%] mx-auto  relative' >
                    <img src="\assets\fourShare.jpg" alt="" className='w-[50px] absolute -left-3 -top-3' />
                    <p className=' text-[15px] w-[90%] font-semibold'><span className='bg-[#a4c83a] font-serif text-lg text-white' >2%</span>  If the third-level user shares the link further and the fourth-level user purchases a plan, you will receive 2% of the plan's cost as a referral reward.</p>
                </div>
                <div className='bg-gradient-to-r from-white to-[#21CFBC]  p-2 rounded-xl shadow-xl flex justify-end w-[90%] mx-auto  relative' >
                    <img src="\assets\fiveShare.jpg" alt="" className='w-[50px] absolute -left-3 -top-3' />
                    <p className=' text-[23px] w-[90%] font-semibold'><span className='bg-teal-500 font-serif text-lg text-white' >2%</span> - For the Third-level referral and all subsequent levels, you will receive 2% of the plan's cost as a referral reward for every plan purchased.</p>
                </div> */}
            </div>
        </div>
    )
}

export default Share 