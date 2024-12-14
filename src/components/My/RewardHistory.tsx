import React, { useEffect, useState } from "react";
import InnerPageHeading from "../Common/InnerPageHeading";
import APIs from "../../API/API";
import axios from "axios";

function RewardHistory() {



  const [RewardHis, setRewardHis] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const tokan = localStorage.getItem("token")


  useEffect(() => {
    let config = {
      method: APIs.RewardHistory.method,
      maxBodyLength: Infinity,
      url: APIs.RewardHistory.path,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${tokan}`
      }
    };

    setLoading(true)
    axios.request(config)
      .then((response) => {
        setRewardHis(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])


  return (
    <>
      <section>
        <InnerPageHeading title={"Reward History"} />
        <div className="py-4 px-2">
          {
            loading ? <div className="flex justify-center items-center h-[90vh] text-blue-500" >
              <h1>Loading...</h1>
            </div> : (
              RewardHis.length === 0 ? (
                <img src="/assets/NoData2.png" alt="No Data" className="mt-3 w-[95%] mx-auto" />
              ) : (
                RewardHis.map((item: any, index: number) => {
                  return (
                    <div className="bg-white rounded-2xl flex justify-between px-6 py-3 mb-2">
                      <div>
                        <h1 className="text-[13px] font-sans text-blue-600">{item.message}</h1>
                        <h1 className="text-[13px] font-sans">{item.status}</h1>
                      </div>
                      <div>
                        <h1 className="text-[13px] font-sans">
                          Amount :- <span className="text-blue-600">{item.amount}</span>
                        </h1>
                        <h1 className="text-[13px] font-sans">Date:- {new Date(item?.created_at).toLocaleDateString('en-IN').replace(/\//g, '-')}</h1>
                      </div>
                    </div>
                  )
                }
                )))
          }
        </div>
      </section>
    </>
  );
}

export default RewardHistory;
