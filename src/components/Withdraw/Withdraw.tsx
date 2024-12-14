import React, { useEffect, useState } from "react";
import InnerPageHeading from "../Common/InnerPageHeading";
import APIs from "../../API/API";
import axios from "axios";
import { toast } from "react-toastify";

interface WithdrawHistoryProps {
  amount: number;
}

function Withdraw() {


  const [amount, setAmount] = useState("")
  const [holder_name, setholder_name] = useState("")
  const [account_number, setaccount_number] = useState("")
  const [ifsc_code, setifsc_code] = useState("")
  const [loading, setLoading] = useState(false);
  const tokan = localStorage.getItem("token")

  const [AvailableAmount, setAvailableAmount] = useState("")

  useEffect(() => {
    let config = {
      method: APIs.Available_Amount.method,
      maxBodyLength: Infinity,
      url: APIs.Available_Amount.path,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${tokan}`
      }
    };

    setLoading(true)
    axios.request(config)
      .then((response) => {
        setAvailableAmount(response.data.data.balance)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])



  const HendleWithdraw = async (e) => {
    console.log("submit click");

    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(APIs.withdrawal_request.path, {
        amount: amount,
        holder_name: holder_name,
        account_number:account_number,
        ifsc_code:ifsc_code
      },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokan}`
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message)
      setAvailableAmount(response?.data?.data?.balance)
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }



  return (
    <>
      <section className="w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-white mx-auto relative">
        <InnerPageHeading title="My Wallet" />

        <div className="bg-blue-500 h-[20vh] pt-8">
          <h1 className="text-white text-3xl font-semibold text-center">₹{!loading ? AvailableAmount : "XXX"}</h1>
          <h2 className="text-center text-gray-100 text-[14px]">
            Money in your Wallet
          </h2>
        </div>
        <div className="border mx-3 px-3 pt-4 pb-9 m-[-35px] bg-white relative">
          <h2 className="text-center font-semibold text-[17px]">
            Withdraw Money
          </h2>
          <form onSubmit={HendleWithdraw} className="">
            <div className="flex flex-col my-2">
              <label className="text-blue-600 font-semibold text-[14px]">
                Enter Amount ($)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500"
                className="border px-2 py-2 rounded-md my-2 outline-blue-500"
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-blue-600 font-semibold text-[14px]">
                Card Holder
              </label>
              <input
                type="text"
                value={holder_name}
                onChange={(e) => setholder_name(e.target.value)}
                placeholder="Card Holder Name"
                className="border px-2 py-2 rounded-md my-2 outline-blue-500"
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-blue-600 font-semibold text-[14px]">
                Account Number
              </label>
              <input
                type="number"
                value={account_number}
                onChange={(e) => setaccount_number(e.target.value)}
                placeholder="Your Account Number"
                className="border px-2 py-2 rounded-md my-2 outline-blue-500 no-arrow"
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-blue-600 font-semibold text-[14px]">
                IFSC Code
              </label>
              <input
                type="text"
                value={ifsc_code}
                onChange={(e) => setifsc_code(e.target.value)}
                placeholder="Enter Your IFSC Code"
                className="border px-2 py-2 rounded-md my-2 outline-blue-500"
              />
            </div>
            <div>
              <div className="flex justify-between pb-2">
                <button type="button" onClick={() => setAmount("1000")} className="text-blue-600 font-semibold border-[1px] border-blue-600 w-[100px] py-[3px] rounded-full hover:bg-blue-600 hover:text-white">
                  1000
                </button>
                <button type="button" onClick={() => setAmount("2000")} className="text-blue-600 font-semibold border-[1px] border-blue-600 w-[100px] py-[3px] rounded-full hover:bg-blue-600 hover:text-white">
                  2000
                </button>
                <button type="button" onClick={() => setAmount("3000")} className="text-blue-600 font-semibold border-[1px] border-blue-600 w-[100px] py-[3px] rounded-full hover:bg-blue-600 hover:text-white">
                  3000
                </button>
              </div>
              <div className="flex justify-between pt-2">
                <button type="button" onClick={() => setAmount("4000")} className="text-blue-600 font-semibold border-[1px] border-blue-600 w-[100px] py-[3px] rounded-full hover:bg-blue-600 hover:text-white">
                  4000
                </button>
                <button type="button" onClick={() => setAmount("5000")} className="text-blue-600 font-semibold border-[1px] border-blue-600 w-[100px] py-[3px] rounded-full hover:bg-blue-600 hover:text-white">
                  5000
                </button>
                <button type="button" onClick={() => setAmount("10000")} className="text-blue-600 font-semibold border-[1px] border-blue-600 w-[100px] py-[3px] rounded-full hover:bg-blue-600 hover:text-white">
                  10000
                </button>
              </div>
            </div>
            <h1 className=" text-center text-[12px] mt-5 text-red-500" >Please note that a 6% transaction  fee will be deducted from the withdrawal amount to cover processing and logistical expenses.</h1>
            <div className=" flex justify-center mt-5">
              <button type={loading?"button":"submit"} disabled={loading?true:false} className="bg-blue-600 text-white text-[13px] duration-300 font-semibold py-[7px] px-9 rounded-full hover:text-blue-600 hover:bg-white hover:border-[1px] hover:border-blue-600">
                {loading ? "Processing... " : "PROCEED TO ADD"}
              </button>
            </div>
          </form>

        </div>
        <div className="bg-white rounded-2xl mt-10 mx-3 p-4 pb-16 ">
          <h2 className="font-semibold py-2 text-[18px] text-blue-500">Rules:</h2>
          <ol className="list-decimal ps-2 leading-tight flex flex-col gap-4">
            <li className="text-gray-950" >Transactions are processed within 12 to 24 hours.</li>
            <li className="text-gray-950" >The single withdrawal amount is up to 500.</li>
            <li className="text-gray-950" >No transactions will be processed on Saturday or Sunday.</li>
            <li className="text-gray-950" >Transactions are available only between 9:00 AM and 6:00 PM.</li>
            <li>Requests made outside operating hours will be processed the next business day.</li>
          </ol>
        </div>
      </section>
    </>
  );
}

export default Withdraw;
