import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import InnerPageHeading from "../Common/InnerPageHeading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import APIs  from "../../API/API";

interface Invest {
  id: number;
  name: string;
  image: string;
  amount: number;
  duration: number;
  daily_reward: number;
  invite_reward: number;
  is_custom: number;
  status: string;
}

function Invest() {
  let [data, setData] = useState<Invest[]>([]);
  let [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const token = localStorage.getItem("token")


  useEffect(() => {
    let config = {
      method: APIs.Invest.method,
      maxBodyLength: Infinity,
      url: APIs.Invest.path,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true)

    axios
      .request(config)
      .then((response) => {
        setData(response.data.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section className="w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-[#eee] mx-auto relative">
        <InnerPageHeading title={"Invest"} />
        <div className="pb-16">
          {data.map((data, index) => {
            return (
              <div key={index} className="bg-white mx-3 py-3 mt-3 shadow-2xl shadow-gray-300 rounded-xl ">
                <div className="flex gap-5 px-2 py-1 flex-wrap justify-center ">
                  <div className="rounded-[1px] w-[40%] h-[17vh]">
                    <img
                      src={data.image ?? "assets/solar1.png"}
                      alt="image"
                      className=" h-full rounded-[5px] shadow-lg"
                    />
                  </div>
                  <div className="min-w-fit w-[50%] flex flex-col justify-between">
                    <div className="leading-7">
                      <div className="flex justify-between items-center">
                        <span className="text-md font-medium">Price</span>
                        <h2 className="text-[16px] font-semibold text-red-600">
                        &#8377;{data.amount}
                        </h2>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-md font-medium">Daily Profits</span>
                        <h2 className="text-[16px] font-semibold ">
                        &#8377;{data.daily_reward}
                        </h2>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-md font-medium">Validity</span>
                        <p className="text-[16px] font-semibold ">
                          {data.duration} Day
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-md font-medium">Total Profit</span>
                        <p className="text-[16px] font-semibold ">
                        &#8377;{data.duration*data.daily_reward}
                        </p>
                      </div>

                   
                    </div>
                  </div>
                </div>

                <div className="px-2 pt-2 ">
                  <h1 className="text-[14px] text-red-500 py-2 text-center" >Enjoy a 30% discount on your wallet amount transaction</h1>
                  <div className="flex justify-between items-end flex-wrap ">
                    <div className="bg-gray-600 py-[9px] px-3 rounded-[5px] w-[40%] ">
                      <h2 className="text-white text-[15px]  font-semibold text-center ">
                        {data.name}
                      </h2>
                    </div>
                   
                    <div className="w-[50%] flex justify-center ">
                      <button
                        className="flex items-center gap-2 border px-[50px] py-[8px] text-[15px] rounded-[5px] bg-gradient-to-r from-sky-900 to-blue-500  hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-800 text-white hover:text-white font-semibold"
                        
                        onClick={() => {
                          navigate("/paymentDetails", {
                            state: {amount: data.amount, is_custom: data.is_custom, id:data.id },
                          });
                        }}
                       >
                        <FontAwesomeIcon
                          icon={faCartShopping}
                        />
                        Buy
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="flex justify-between px-3 items-center">
                  <div className="text-center">
                    <span className="text-sm text-gray-600">Cycle</span>
                    <p className="bg-blue-600 text-white w-[60px] mt-1 py-[2px] rounded-full">
                      {data.duration}
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-600">Days</span>
                    <p className="bg-blue-600 text-white w-[60px] mt-1 py-[2px] rounded-full">
                      {data.daily_reward}
                    </p>
                  </div>
                  <Link to={"/paymentDetails"}>
                    <button className=" border px-[35px] py-[6px] text-[15px] rounded-[8px] bg-blue-600 text-white hover:bg-black">
                      <FontAwesomeIcon icon={faCartShopping} className="pe-2" />
                      Buy
                    </button>
                  </Link>
                </div> */}
              </div>
            );
          })}

          {/* <div className="bg-white mx-2 py-3 mt-12 ">
            <div className="flex gap-5 py-3 relative">
              <div className="rounded-[4px] w-[190px]  mt-[-60px] top-[-50px] ">
                <img
                  src="src\assets\solarInvest.jpg"
                  alt="image"
                  className=" w-full rounded-[4px]"
                />
              </div>
              <div>
                <h2 className="text-[15px] mt-[-53px] ">TJ-123</h2>
                <h2 className="text-[15px] pt-5 text-red-500">$ 400</h2>
              </div>
            </div>

            <div className="flex justify-between px-3 pt-4 items-center">
              <div>
                <p className="text-sm text-gray-500">120 days</p>
                <span className="text-sm text-gray-500">Cycle</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">120 days</p>
                <span className="text-sm text-gray-500">Cycle</span>
              </div>
              <div>
                <button className=" border px-[35px] py-[3px] text-[15px] rounded-[5px] bg-blue-600 text-white hover:bg-black">
                  <FontAwesomeIcon icon={faCartShopping} className="pe-2" />
                  Buy
                </button>
              </div>
            </div>
          </div> */}
        </div>
        <div className={`h-[50vh] w-full flex justify-center items-center ${loading?"block":"hidden"} `} >
        {
                loading?
                <h1 className="font-bold text-blue-500 ">Loading...</h1>:null
              }
            </div>
      </section>
    </>
  );
}

export default Invest;
