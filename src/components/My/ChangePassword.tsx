import React, { useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import axios from 'axios'
import APIs  from '../../API/API'
import { toast } from 'react-toastify'



function ChangePassword() {


  const [CurrentPass, setCurrentPass] = useState("")
  const [NewPassword, setNewPassword] = useState("")
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token")

  const HendleSubmit = async (e) => {
    e.preventDefault();

    // if (
    //     PhoneNo.length === 0||
    //     Password.length === 0||
    //     ConfirmPassword.length === 0 ||
    //     Email.length === 0 ||
    //     Name.length === 0

    // ) {
    //     toast.error("Please fill all fields");
    //     return;
    // }

    setLoading(true);


    try {
      const response = await axios.put(APIs.ChangePassword.path,
        {
          current_password: CurrentPass,
          new_password: NewPassword,
          new_confirm_password: ConfirmNewPassword

        }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}` 
        }
      }
      )
      toast.success(response.data.message)      
    }
    catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <InnerPageHeading title={"Change Password"} />
      <div className='px-4 py-4' >
        <h4 className='font-bold text-lg text-blue-600'>Password Information</h4>
        <h6 className='font-normal text-[14px] text-gray-600' >Find all your Password realated Information</h6>

        <div className='flex justify-center mb-4' >
          <img src="\assets\password.png" alt="image" className='h-[110px]' />
        </div>
        <form className='my-1' onSubmit={HendleSubmit} >
          <div className='flex flex-col mt-1' >
            <label className='font-semibold px-2 mb-1 text-blue-600 ' >Old Password</label>
            <input type="password"
              value={CurrentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              name="oldpassword"
              placeholder="Enter Old Password"
              className='py-2 border-2 border-blue-500 rounded-lg px-3' />
          </div>
          <div className='flex flex-col mt-3' >
            <label className='font-semibold px-2 mb-1 text-blue-500 ' >New Password</label>
            <input type="password"
              value={NewPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              name="newpassword"
              placeholder="Enter New Password"
              className='py-2 border-2 border-blue-500 rounded-lg px-3' />
          </div>
          <div className='flex flex-col mt-3' >
            <label className='font-semibold px-2 mb-1 text-blue-500 ' >Confirm Password</label>
            <input type="password"
              value={ConfirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              name="confirmpassword"
              placeholder="Enter Confirm Password"
              className='py-2 border-2 border-blue-500 rounded-lg px-3' />
          </div>
          <div className='flex justify-center mt-8' >
            <button type='submit' className='bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-[1px] hover:border-blue-600 font-semibold text-white py-3 px-10 rounded-2xl'>{loading?"Updating..." : "Update"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword