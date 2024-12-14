import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartLine,
  faChevronRight,
  faClockRotateLeft,
  faGear,
  faGift,
  faHandshakeAngle,
  faMoneyBillTransfer,
  faShieldHalved,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIs from "../../API/API";
import axios from "axios";
import useModalStore from "../../Store/ModalTogal";


function My() {
  const navigate = useNavigate();
const tokan = localStorage.getItem("token")


  const [user, setUser] = useState({
    name: '',
    phone: '',
    refer_code: '',
    email: '',
    total_investment:'',
    withdrawal:"",
    balance:"",
    upi: null
  })
  
  const [loading, setLoading] = useState(false)


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

    setLoading(true)
    axios.request(config)
      .then((response) => {
        setUser(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])


  const hendleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('model-state')
    //@ts-ignore
    useModalStore.getState()?.resetModal()
    navigate("/")
  }

  return (
    <div className="pb-16">
      <div className="bg-gradient-to-t from-[#eee] to-blue-400 px-4 py-4 ">
        <div className="justify-between flex">
          <Link to={"/ChangePassword"}>
            <FontAwesomeIcon icon={faGear} className="text-3xl text-blue-800" />
          </Link>
          <button onClick={()=>hendleLogout()} >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-3xl text-blue-800"
            />
          </button>
        </div>
        <div className="justify-center flex  mb-1">
          {/* <FontAwesomeIcon icon={faShieldHalved}  className="text-8xl text-blue-800"/> */}
          {/* <img src='src\assets\MyProfile.png' className=' w-[100px]' /> */}
          <img src="\assets\privacy.png" className=" w-[90px]  " />
        </div>
        <div className="text-center leading-1 pb-5">
          <p className="font-bold">{user.name?user.name:"User"}</p>
          <p className="text-[13px] font-semibold">{user.phone?user.phone:"+91 00000 00000"}</p>
          <p className="text-[13px] leading-4  ">{user.email?user.email:"xyz@gmail.com"}</p>
        </div>
        <div className="flex justify-between -mb-12 " >
          <div className="bg-[rgba(0,0,0,.1)] py-2  w-[30%] rounded-lg  flex flex-col justify-between items-center gap-2  " >
            <h1 className="text-sm text-center font-bold " >Balance</h1>
            <h1 className=" text-blue-500 " >₹<span className="text-blue-500 font-bold">{loading?"XXX":user.balance}</span> </h1>
          </div>
          <div className="bg-[rgba(0,0,0,.1)] py-2  w-[30%] rounded-lg flex flex-col justify-between items-center  gap-2  " >
            <h1 className="text-sm text-center font-bold " >Withdraw </h1>
            <h1 className=" text-blue-500 " >₹<span className="text-blue-500 font-bold">{loading?"XXX":user.withdrawal}</span> </h1>

          </div>
          <div className="bg-[rgba(0,0,0,.1)] py-2  w-[30%] rounded-lg flex flex-col justify-between items-center  gap-2  " >
            <h1 className="text-sm text-center font-bold " >Total Invest</h1>
            <h1 className=" text-blue-500 " >₹<span className="text-blue-500 font-bold">{loading?"XXX":user.total_investment}</span> </h1>
          </div>
        </div>
      </div>
      <div className="px-4 mt-12" >
        <h3 className="text-[19px] text-blue-800 font-semibold">
          Profile Infomation
        </h3>
        <h3 className="text-[14px] text-gray-600">
          Find all your Profile related infomation
        </h3>
      </div>

      <div className="my-6 flex flex-col  mx-8 rounded-2xl overflow-hidden bg-white shadow-2xl ">
        <Link
          to={"/UserProfile"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">User Profile</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>


        <Link
          to={"/withdraw"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faMoneyBillTransfer}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">Withdraw Fund</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>

        <Link
          to={"/referAndEarn"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faUserGroup}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] "> Refer & Earn</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>

        <Link
          to={"/income"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faChartLine}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">Level Income</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>
    

        <Link
          to={"/rewardHistory"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faGift}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">Reward history</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>

        <Link
          to={"/fundHistory"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">Fund History</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>


        <Link
          to={"/Withdraw_history"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">Withdraw History</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>       
      </div>



      <div className="my-5 mb-5 flex flex-col mx-8 rounded-2xl overflow-hidden bg-white shadow-2xl ">
      <Link
          to={"/getHelp"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faHandshakeAngle}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">Get Help</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>

        <Link
          to={"/ChangePassword"}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faGear}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] ">Setting</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </Link>
        <button
          onClick={() => hendleLogout()}
          className="border-[1px] border-t-gray-300 flex justify-between pr-4 py-3  items-center"
        >
          <div className="flex items-center gap-1 w-[95%] ">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-2xl text-blue-800 w-[20%] "
            />
            <h2 className="text-md font-normal w-[80%] text-left">Logout</h2>
          </div>
          <div className="w-[5%]">
            <FontAwesomeIcon icon={faChevronRight} className="text-blue-800" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default My;
