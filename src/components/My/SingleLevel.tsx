import React, { useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import APIs from '../../API/API';

function SingleLevel() {

  const location = useLocation();
  const level = location?.state?.level
  const [data, setData] = useState([{
    name: "",
    status:"",
    created_at:"",
    amount:""
  }]);
  const [loading, setLoading] = useState(false)
  const tokan = localStorage.getItem("token")


  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: APIs.SingleLevel.path + level,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${tokan}`
      }
    };

    setLoading(true)
    axios.request(config)
      .then((response) => {
        setData(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log("i am error", error);
      });
  }, [])


  return (
    <div className='h-dvh' >
      <InnerPageHeading title={"Level View"} />
      <div className="px-3 py-3">

        {
          loading ? (<h1 className='mt-32 text-center text-blue-600' >Loading</h1>) : (

            data.length === 0 ? (
              <img src="/assets/NoData2.png" alt="No Data" className="mt-3 w-[95%] mx-auto" />
            ) : (
              data.map((item, index) => {
                return (
                  <>
                  <div key={index} className="bg-white shadow-xl rounded-2xl flex justify-between px-4 py-3 mb-3 ">
                    <div>
                      <h1 className='text-blue-500 font-semibold py-1' >Name :- {loading ? "...." : item?.name}</h1>
                      <h1>Amount :- ₹{item.amount === null ? "0" : item.amount} </h1>
                    </div>
                    <div className='flex flex-col items-end' >
                      <h1 className='bg-blue-500 text-white rounded-full py-1 px-5 text-center w-fit' >{item?.status}</h1>
                      <h1 className='text-sm' >Date:- {new Date(item?.created_at).toLocaleDateString('en-IN').replace(/\//g, '/')}</h1>
                    </div>
                  </div>
                  </>
                )
              })

            )

          )
        }


      </div>
    </div>
  )
}

export default SingleLevel