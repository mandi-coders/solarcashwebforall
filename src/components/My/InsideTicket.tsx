import React, { useCallback, useEffect, useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faShare } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useLocation } from 'react-router-dom';
import APIs from '../../API/API';
import axios from 'axios';
import { toast } from 'react-toastify';


function InsideTicket() {

    const location = useLocation();
    const ticketId = location.state.Id;
    const [loading, setLoading] = useState(false)
    const [Message, setMessage] = useState("")
    const [Sending, setSending] = useState(false);
    const [reFetch, setReFetch] = useState(false)
    const tokan = localStorage.getItem("token")

    const [Data, setData] = useState([
        {
            reply: "",
            created_at: "",
            user:""

        },
    ]);

    const refetch  =  useCallback(( ) => setReFetch(old => !old),[])

    const HendalReply = async (e) => {
        e.preventDefault();

        if (
            Message.length === 0
        ) {
            toast.error("Enter A Message");
            return;
        }
        setSending(true)
        try {
            const response = await axios.put(APIs.replyMessage.path + ticketId, {
                reply: Message
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokan}`
                }
            }
            )
            if(response.data.success){
                refetch()
            setMessage("")
            }
            setSending(false)
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        let config = {
            method: APIs.GetSingleicket.method,
            maxBodyLength: Infinity,
            url: APIs.GetSingleicket.path + ticketId,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokan}`
            }
        };
        setLoading(true)
        axios.request(config)
            .then((response) => {
                setData(response.data.data);
                console.log(response.data.data);
                
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reFetch])


    return (
        <div className='h-[100vh]'>
            <InnerPageHeading title={"View Message"} />
            <div className='h-[85vh] py-3 px-2 flex flex-col gap-3  ' >
                {
                    loading ? (
                        <div className='bg-gray-300 rounded-lg py-1 px-3 w-[70%] max-w-[90%] flex flex-col ' >
                            <h1 className='text-lg pr-4 pl-1'>
                                .............
                            </h1>
                            <div className='flex justify-end px-2' >
                                <h1 className='text-[12px]' >
                                    Date:- 01/01/2001
                                </h1>
                            </div>

                        </div>
                    ) : (

                        Data.map((item, index) => {
                            return (
                                <>
                                <div className={`flex ${item.user === "user" ? "justify-end" : "justify-start" } w-full`} >
                                <div className={`bg-gray-300 ${item.user === "user" ?"rounded-tl-2xl" : "rounded-tr-2xl"} rounded-b-2xl py-1 px-3 w-[60%] max-w-[90%] flex flex-col  `} >
                                    <h1 className='text-sm pr-4 pl-1 break-words '>
                                        {item.reply}
                                    </h1>
                                    <div className='flex justify-end' >
                                        <h1 className='text-[10px] text-gray-500' >
                                            {(new Date(item?.created_at)).toLocaleString("en-IN", {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true, 
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}

                                        </h1>
                                    </div>
                                </div>
                                </div>
                                </>
                            )
                        }
                        ))
                }
            </div>
            <div className='w-[100vw] sm:w-[400px] absolute bottom-1 '>
                <form onSubmit={HendalReply} className='border-2 border-blue-500 rounded-full mx-auto flex self-end overflow-hidden w-[95%] h-[100%] items-center' >
                    <input
                        value={Message}
                        onChange={(e) => setMessage(e.target.value)}
                        type='text' className='w-full bg-transparent outline-none h-[100%] py-2 px-4' placeholder='Send Message...' />
                    <button type={Sending?"button":"submit"} className={`text-2xl text-white ${Sending?"bg-blue-300" : "bg-blue-600"} p-2 px-2 `} >
                        <FontAwesomeIcon icon={faShare} />
                    </button>
                </form>
            </div>

        </div>
    )
}

export default InsideTicket