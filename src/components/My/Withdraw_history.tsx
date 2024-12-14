import React, { useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import APIs from '../../API/API';
import axios from 'axios';

interface WithdrawHistoryProps {
    amount: number;
    status: string;
    created_at: string;
}

function Withdraw_history() {


    const [Withdraw_history, setWithdraw_history] = useState<WithdrawHistoryProps[]>([])

    const tokan = localStorage.getItem("token")

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let config = {
            method: APIs.withdrawal_history.method,
            maxBodyLength: Infinity,
            url: APIs.withdrawal_history.path,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokan}`
            }
        };

        setLoading(true)
        axios.request(config)
            .then((response) => {
                setWithdraw_history(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    return (
        <div className='h-[100vh]' >
            <InnerPageHeading title={"WithDraw"} />
            {/* <div className='py-6 flex justify-center  ' >
                <div className="h-[20vh] w-[80%] rounded-lg overflow-hidden relative   shadow-sm shadow-gray-500 ">
                    <img src="\assets\WithDraw_background.png" alt="" className='h-[100%] w-[100%] absolute top-0 bg-blue-500 z-1 ' />
                    <div className="bg-transparent absolute top-0 z-2 py-5 px-4 w-[100%] ">
                        <h1 className='text-lg text-white font-semibold' >SUSU Account</h1>
                        <div className='w-[50%] flex flex-col mt-4' >
                            <h1 className='text-sm font-normal text-gray-100' >Balancce</h1>
                            <h1 className='text-2xl text-white font-bold '>₹ {loading?"XXX":user.balance}</h1>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='bg-white w-[90%] mx-auto h-[90vh] mt-3 overflow-y-auto rounded-2xl p-4 ' >
                {
                    loading ? <div className='flex justify-center items-center h-[80vh] ' >
                        <h1 className='text-xl'>Loading...</h1>
                    </div> : (
                        Withdraw_history.length === 0 ? (
                            <img src="/assets/NoData.png" alt="No Data" className="mt-3 w-[95%] mx-auto" />
                        ) : (

                            Withdraw_history.map((item, index) => {
                                return (
                                    <div key={index} className='flex justify-between mb-4 ' >
                                        <div className='bg-gray-300 rounded-lg h-full w-12 overflow-hidden ' >
                                            <img src="\assets\withdraw_cr.jpeg" alt="" className='h-full w-full' />
                                        </div>
                                        <div className='flex flex-col' >
                                            <h1 className='text-lg font-bold text-gray-600'>Status</h1>
                                            <h1 className='text-sm font-light text-gray-500'>{item?.status}</h1>
                                        </div>
                                        <div className='flex flex-col items-end' >
                                            <h1 className='text-lg font-semibold text-green-600'>₹ {item?.amount}</h1>
                                            <h1 className='text-sm font-semibold text-gray-500'>{new Date(item?.created_at).toLocaleDateString('en-IN').replace(/\//g, '-')}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    )
                }



            </div>
        </div>
    )
}

export default Withdraw_history