import React, { useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import { Link, useNavigate } from 'react-router-dom'
import APIs from '../../API/API';
import axios from 'axios';


function ViewTicket() {

    const [Data, setData] = useState([{
        id: '',
        subject: '',
        description: '',
        status: '',
        created_at: '',
        updated_at: '',

    }])

    const navigate = useNavigate();

    const tokan = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let config = {
            method: APIs.GetAllTicket.method,
            maxBodyLength: Infinity,
            url: APIs.GetAllTicket.path,
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
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    return (
        <div>
            <InnerPageHeading title="View Ticket" />
            <div className='px-3 py-3 h-[93vh] overflow-y-auto' >
                {
                    loading ? <div className='flex justify-center items-center h-[93vh]'>
                        <h1 className='text-blue-500 font-semibold'>Loading...</h1>
                    </div> : (
                        Data.length === 0 ? (
                            <img src="/assets/NoData2.png" alt="No Data" className="mt-3 w-[95%] mx-auto" />

                        ) : (
                            Data.map((item, index) => {
                                return (
                                    <div onClick={() => {
                                        navigate("/SingleTicket", {
                                            state: { Id: item.id, },
                                        });
                                    }}
                                        className='bg-white rounded-2xl flex justify-between px-4 py-2 mb-2' >
                                        <div>
                                            <h2 className='text-lg font-semibold'>Ticket ID: {item.id}</h2>
                                            <h1 className='text-[13px] font-sans' >Title :-
                                                <span className='text-[13px] font-sans text-blue-500' >{item.subject.length > 25 ? item.subject.slice(0, 24) + "..." : item.subject}</span></h1>
                                        </div>
                                        <div>
                                            <h1 className='text-[13px] font-sans text-white bg-blue-600 rounded-full py-1 text-center cursor-pointer' >View Ticket</h1>
                                            <h1 className='text-[13px] font-sans' >Date:-
                                                {(new Date(item?.created_at)).toLocaleDateString("en-IN")}
                                            </h1>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        )
                    )


                }
            </div>
        </div>
    )
}

export default ViewTicket