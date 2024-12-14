import React, { useEffect, useState } from "react";
import InnerPageHeading from "../Common/InnerPageHeading";
import Footer from "../Common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAnglesUp,
  faShieldCat,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import APIs from "../../API/API";
import axios from "axios";

interface Income {
  name: string;
}

interface Income1 {
  total_income: number;
}

function Income() {
  let [data, setData] = useState<Income[]>([]);
  let [data1, setData1] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {

    
    const token = localStorage.getItem("token")

    let config = {
      method: APIs.Income.method,
      maxBodyLength: Infinity,
      url: APIs.Income.path,
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

    let config1 = {
      method: APIs.TotalIncome.method,
      maxBodyLength: Infinity,
      url: APIs.TotalIncome.path,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config1)
      .then(({data:response}) => {
        console.log(response);
        
        setData1(response.data.total_income);

        // setData1(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <section className="w-[100vw] sm:w-[400px] min-h-[100vh] h-auto bg-[url('/assets/levelBG.jpg')] bg-center bg-cover mx-auto relative">
        <InnerPageHeading title={"Income Level"} />

        <div className="flex justify-between bg-[#f5f7f753] backdrop:blur-[100px] m-3 px-5 py-2 rounded-2xl border-2 border-gray-400 ">
          <div className="flex flex-col  items-end text-white text-[19px]">
            <h1>Level Income is </h1>
            <h1 className="text-white text-[20px] "> ₹ {typeof data1 !=="undefined" ? data1 : "XXXX"}</h1>
          </div>
          <div>
            <img src="\assets\level.png" alt="" className="w-[60px]" />
          </div>
        </div>

        {/* 
        <div className="pb-12">
        <div className="m-3 bg-gray-700 rounded-3xl overflow-hidden ">
          {data.map((data, index) => {
            return (
              <Link
                key={index}
                to={"/SingleLevel"}
                className="flex items-center justify-between border-b-[1px] hover:bg-gray-600 duration-300 px-5 border-white py-5"
              >
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faAnglesUp}
                    className="text-purple-700 text-[20px]"
                  />
                  <p className="text-white">{data.name}</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="text-purple-700 text-[20px]"
                  />
                </div>
              </Link>
            );
          })}
          </div>
        </div> */}

        <div className=" rounded-lg mx-2 h-[80vh] flex flex-col " >
          <div className="h-[50%] w-full flex flex-col items-center justify-center " >
            <div className="w-[50%] h-[90%] bg-[#eff3f454] backdrop:blur-3xl rounded-lg py-4" >
              <img src="\assets\level1.png" alt="" className="w-[70px] mx-auto " />
              <h1 className="text-white text-center text-xl my-3" >Level 1</h1>
              <div className="flex justify-center">
                <button onClick={()=>{
                  navigate("/SingleLevel",{
                    state: {level:1}
                  })
                }} className="bg-blue-500 rounded-full py-1 text-white px-5" >Know More</button>
              </div>
            </div>
          </div>
          <div className="h-[50%] flex gap-5" >
            <div className="w-[48%] h-[90%] bg-[#9dd4e682] backdrop:blur-3xl rounded-lg py-4" >
              <img src="\assets\level2.png" alt="" className="w-[70px] mx-auto " />
              <h1 className="text-white text-center text-xl my-3" >Level 2</h1>
              <div className="flex justify-center">
                <button 
                onClick={()=>{
                  navigate("/SingleLevel",{
                    state: {level:2}
                  })}}
                className="bg-blue-500 rounded-full py-1 text-white px-5" >Know More</button>
              </div>

            </div>
            <div className="w-[48%] h-[90%] bg-[#9dd4e682] backdrop:blur-3xl rounded-lg py-4" >
              <img src="\assets\level3.png" alt="" className="w-[70px] mx-auto " />
              <h1 className="text-white text-center text-xl my-3" >Level 3</h1>
              <div className="flex justify-center">
                <button 
                onClick={()=>{
                  navigate("/SingleLevel",{
                    state: {level:3}
                  })}}
                className="bg-blue-500 rounded-full py-1 text-white px-5 " >Know More</button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Income;
