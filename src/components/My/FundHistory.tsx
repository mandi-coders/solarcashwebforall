import React, { useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import APIs from '../../API/API';
import axios from 'axios';

interface FundHistory {
  amount: number;
  status: string;
  created_at: string
}

function FundHistory() {

  let [data, setData] = useState<FundHistory[]>([]);
  let [loading, setLoading] = useState(false);
  const tokan = localStorage.getItem("token")


  useEffect(() => {
    let config = {
      method: APIs.Income.method,
      maxBodyLength: Infinity,
      url: APIs.Income.path,
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
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data)

  return (
    <div>
      <InnerPageHeading title={"Fund History"} />
      <div className='px-3 py-3 h-[93vh] overflow-y-scroll' >
        {
          loading ? <div className='flex justify-center items-center h-[80vh] ' >
            <h1 className='text-xl text-blue-500'>Loading...</h1>
          </div> : (
          data.length === 0 ?(
            <img src="/assets/NoData2.png" alt="" className="mt-3 w-[95%] mx-auto" />
          ):(
            data.map((data, index) => {
              return (
                <div key={index} className='bg-white rounded-2xl flex justify-between px-8 py-2 mb-2' >
                  <div>
                    <h1 className='text-[13px] font-sans' >Status</h1>
                    <h1 className='text-[13px] font-sans text-blue-500' >{loading ? "....." : data.status}</h1>
                  </div>
                  <div>
                    <h1 className='text-[13px] font-sans' >Amount :- <span className='text-blue-500'>{loading ? "XXX" : data.amount}</span></h1>
                    <h1 className='text-[13px] font-sans' >Date:- {(new Date(data.created_at)).toLocaleDateString("en-IN")}</h1>

                  </div>
                </div>
              )

            })
          )
          )
        }
        {

        }

      </div>
    </div>
  )
}

export default FundHistory