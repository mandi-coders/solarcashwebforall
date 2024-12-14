import React, { useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faL } from '@fortawesome/free-solid-svg-icons'
import APIs from '../../API/API';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ShareSocial } from 'react-share-social'


interface User {
  name: string;
  phone: string;
  refer_code: string;
  email: string;
  upi: string | null; // UPI can be null or a string
}

function ReferAndEarn() {

  const tokan = localStorage.getItem("token")
  const [user, setUser] = useState<User>({
    name: '',
    phone: '',
    refer_code: '',
    email: '',
    upi: null
  })
  const baseUrl = `${window.location.protocol}//${window.location.host}`;


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

  const copyCode = () => {
    toast.success("Reffer Code Copied")
  }



  return (
    <div className='bg-white min-h-dvh' >
      <InnerPageHeading title={"Refer & Earn"} />
      <div className='justify-center w-full flex pt-[5vh]' >
        <img src='assets\referAndEarn.png' alt='image' className='w-auto h-[180px]' />
      </div>
      <h4 className='text-center text-blue-500 text-[19px] font-bold' >Invite your Friends and get <br /> Earn Reward</h4>
      <h6 className='text-center font-normal text-gray-500 text-sm px-4 my-4' >Shere the code below or ask them to enter it during they signup. Earn when your friend sign up on our app</h6>
      <CopyToClipboard text={user.refer_code} onCopy={copyCode} >
        <div className='border-2 border-blue-500 w-[80%] mx-auto flex p-2' >
          <h1 className='w-full bg-transparent outline-none' >Your referral Code :- {user.refer_code ? user.refer_code : "XXXXXX"}</h1>
          <FontAwesomeIcon icon={faCopy} className='text-2xl text-blue-500 ps-2' />
        </div>
      </CopyToClipboard>
      {/* <div className='flex justify-center py-5  ' >
        <button className='py-2 px-5 rounded-lg bg-blue-700 hover:text-blue-600 text-white hover:bg-white hover:border-[1px] hover:border-blue-600 '  >Invite Friend</button>

      </div> */}
      <div className='mt-1'>
        <ShareSocial
          // title={"Reffer Code is:- " + user.refer_code}

          url={baseUrl+`/Register?r=${user.refer_code}` }
          socialTypes={['whatsapp', 'facebook', 'twitter','email','telegram','linkedin','reddit']}
        />
      </div>

    </div>
  )
}

export default ReferAndEarn