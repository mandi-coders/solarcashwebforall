import React, { useEffect, useState } from "react";
import InnerPageHeading from "../Common/InnerPageHeading";
import { Link, Router, useLocation, useNavigate } from "react-router-dom";
import APIs from "../../API/API";
import axios from "axios";
import { toast } from "react-toastify";

interface MakePayment {
  qr_code: string;
  amount: number;
  link: string;
  payment_id: number;
}

function MakePayment() {
  let [data, setData] = useState<MakePayment>();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const location = useLocation();  
  const orderID = location.state.payment_id  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        url.length === 0
    ) {
        toast.error("Please fill all fields");
        return;
    }
    setLoading(true);
    try {
        const response = await axios.put(APIs.postUTR.path+orderID+"/complete",{
          ref_id:url 
        },
        {
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
        toast.success(response?.data?.message)
        if (response.data.success) {
          navigate("/invest")
        }
    }
    catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error.response);
    } finally {
        setLoading(false);
    }
  };


  
  return (
    <>
      <section className="w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-[#eee] mx-auto relative">
        <InnerPageHeading title={"Make Payment"} />

        <div className="text-center py-3">
          <h2 className="text-red-500 py-2 font-bold text-[18px]">
            For Single Transction Only
          </h2>
          <div className="w-[170px] mx-auto pb-2">
            <img src={location.state.qr_code} alt="image" className=" w-full" />
          </div>
          <span className="text-[18px] font-semibold">
          ₹ {location.state.amount}
          </span>
        </div>

        <div className=" bg-white m-2 px-3 py-2 text-center">
          <p className="text-[13px] text-gray-800 font-semibold">
            PayTM, PhonePE, GooglePay, BHIM and more
          </p>
          <div className="py-1 flex justify-center items-center gap-4">
            <img
            onClick={() => window.open('phonepe://' + String(location.state.link).replace("upi://",""),"_blank")}
              src="\assets\phonePay.png"
              alt="Paytm"
              className="w-[50px]"
            />
              <img
            onClick={() => window.open('tez://upi/' + String(location.state.link).replace("upi://",""),"_blank")}

              src="\assets\google-pay_6124998.png"
              alt="Paytm"
              className="w-[60px]"
            />
            <img
            onClick={() => window.open('paytmmp://' + String(location.state.link).replace("upi://",""),"_blank")}
              src="\assets\paytm_825454.png"
              alt="Paytm"
              className="w-[60px]"
            />
          
          </div>
        </div>

        {/* <div className="px-3 pb-5">
          <span className="font-semibold">
            Open Link:- &nbsp;
          </span>
          <Link
            to={"paytm://" + location.state.link}
            target="_blank"
            className="text-blue-700 font-semibold"
          >
            open link
          </Link>
        </div> */}

        <form onSubmit={handleSubmit} className="px-3">
          <div>
            <label>
              <span className="text-red-600 font-bold">*</span> UTR
            </label>
            &nbsp;&nbsp;
            <input
              type="text"
              min="5"
              onInput={(e) => setUrl(e.currentTarget.value)}
              placeholder="UTR(UPI Ref.ID) must be 12 digit"
              className="px-3 py-2 border-black border-[1px] w-[300px]"
            />
          </div>
          <div className="text-center pt-5 py-2">
            <button
              type={loading?"button":"submit"}
              className="hover:bg-white hover:text-blue-700 hover:border-blue-700 hover:border-[1px] font-semibold bg-blue-700 text-white rounded-xl py-2 px-5 text-[18px]"
            >
              {
                loading?"Submitting ...":"Submit"
              }
            </button>
          </div>
        </form>

        {/* <div className="ps-3 pe-2 pt-3 pb-20">
          <h2 className="font-semibold py-2 text-[17px]">Reminder:-</h2>
          <ol className="list-decimal ps-3">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              dolores!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              dolores!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              dolores!
            </li>
          </ol>
        </div> */}
      </section>
    </>
  );
}

export default MakePayment;
