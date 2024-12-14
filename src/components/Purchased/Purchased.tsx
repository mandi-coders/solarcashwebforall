import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCoins, faL, faMoneyBillTransfer, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import InnerPageHeading from "../Common/InnerPageHeading";
import axios from "axios";
import APIs from "../../API/API";

interface Purchased {
  daily_reward: number;
  total_reward: number;
  active_package: [];
}

interface active_package {
  name: string;
  image: string;
  status: string;
  amount: number;
  invert_date: string;
  expiry: string;
  daily_reward: number;
  invite_reward: number;
}

function Purchased() {
  let [data, setData] = useState<Purchased>({
    daily_reward: 0,
    total_reward: 0,
    active_package: [],
  });
  const tokan = localStorage.getItem("token")
  let [active, setActive] = useState<active_package[]>([])
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    let config = {
      method: APIs.Purchased.method,
      maxBodyLength: Infinity,
      url: APIs.Purchased.path,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokan}`,
      },
    };
    setLoading(true)

    axios
      .request(config)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
        setActive(response.data.data.active_package);
        setLoading(false)
      })
      .catch((error) => {

        console.log(error);
      });
  }, []);

  return (
    <>
      <section className="w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-[#fff] mx-auto relative">
        <InnerPageHeading title={"Purchase"} />

        <div className="p-4">
          {/* <div className=" rounded-[5px] h-[180px] w-[100%]">
            <img
              src="src\assets\solarInvest.jpg"
              alt="image"
              className="rounded-[5px] w-[100%] h-full"
            />
          </div> */}
          <div className=" rounded-[10px] py-4 w-[98%] mx-auto bg-gradient-to-r from-sky-900 to-blue-500 ">
            {/* <h1 className="text-sm text-center text-white font-['Maiandra_GD']" >Total Income</h1> */}
            <h1 className="text-2xl text-center text-white font-['Maiandra_GD'] " >
              {/* <FontAwesomeIcon icon={faCoins} className="pe-2 text-[20px]" /> */}
              Your Earning</h1>
            <div className="flex justify-between px-5 items-center mt-7" >
              <div className="flex items-center gap-3 " >
                <div>
                  <FontAwesomeIcon icon={faSackDollar} className="bg-[rgba(97,211,91,0.5)] py-1.5 px-2 rounded-full text-white" />
                </div>
                <div className="flex flex-col items-start relative " >
                  <h1 className="text-[13px] text-center text-white leading-none" >Daily Income</h1>
                  <h1 className="text-lg text-center text-white font-normal " >₹ {data.daily_reward}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3" >
                <div>
                  <FontAwesomeIcon icon={faMoneyBillTransfer} className="bg-[rgba(227,230,235,0.96)] py-1.5 px-2 rounded-full text-blue-600 " />
                </div>
                <div className="flex flex-col items-start" >
                  <h1 className="text-[13px] text-center text-white leading-none" >Total Income</h1>
                  <h1 className="text-lg text-center text-white font-normal " >₹ {data.total_reward}</h1>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold pt-3 pl-2 text-blue-600">My Investment:</h2>

            <div className="pb-8">
              {
                loading ? (
                  <div className={`h-[50vh] w-full flex justify-center items-center ${loading ? "block" : "hidden"} `} >
                    <h1 className="font-bold text-blue-500">Loading...</h1>
                  </div>
                ) : (
                  active?.length === 0 || null ? (
                    <img src="/assets/NoData.png" alt="No Data" className="mt-3 w-[95%] mx-auto" />
                  ) : (
                    active?.map((data, index) => {
                      console.log("data is ", data.name)
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-md my-3 mx-1"
                        >
                          <div className="flex py-2">
                            <span className="w-[40%] ps-3 text-[14px] font-semibold">
                              {data.name}
                            </span>
                            <span className="pe-2 ps-3 text-[14px]">
                              Plan Status:-{" "}
                              <span className={`${data.status === "active" ? "text-green-600" : "text-red-500"} font-semibold text-[16px]`}>
                                {data.status}
                              </span>
                            </span>
                          </div>
                          <div className="flex py-3 items-end">
                            <div className="w-[40%] h-[15vh] ps-3">
                              <img
                                className="w-full h-full rounded-md bg-slate-100"
                                src={data?.image ?? "assets/solar1.png"}
                                alt="image"
                              />
                            </div>
                            <div className="pe-2 ps-3 pb-2">

                              <p className="text-[14px] font-semibold">
                                Price :-{" "}
                                <span className="font-normal pl-1">
                                  ₹{data.amount}
                                </span>
                              </p>

                              <p className="text-[14px] font-semibold mt-1">
                                Invert :-
                                <span className="font-normal pl-1">
                                  {new Date(data.invert_date ).toLocaleDateString("en-US")}

                                </span>
                              </p>
                              <p className="text-[14px] font-semibold mt-1">
                                Expire :- 
                                <span className="font-normal pl-1">
                                  {(new Date(data.expiry)).toLocaleDateString("en-in")}
                                </span>
                              </p>
                              <p className="text-[14px] font-semibold mt-1">
                                Daily Profit :-
                                <span className="font-normal pl-1">
                                  ₹{data.daily_reward}

                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    )))}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Purchased;
