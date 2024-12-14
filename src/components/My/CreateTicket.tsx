import React, { useState } from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import axios from 'axios';
import APIs  from '../../API/API';
import { toast } from 'react-toastify';

function CreateTicket() {

    const [Title, setTitle] = useState("")
    const [Message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token")

    const hendleSubmit = async (e) => {
        e.preventDefault();

        if (
            Title === "" ||
            Message === ""
        ) {
            toast.error("Please fill all the fields");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(APIs.CreateTicket.path, {
                subject: Title,
                description: Message,
            },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            setLoading(false)
            toast.success(response.data.message)
            setTitle("")
            setMessage("")

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error", error.response.data.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <InnerPageHeading title={"Create Ticket"} />

            <div className='py-8 px-5 ' >
                <h1 className='text-blue-500 text-xl font-semibold'>Create New Ticket</h1>
                <p className='text-sm my-2' >Fill up all the infomation here, then click submit<br />  button</p>
                <div className='bg-zinc-800 py-8 px-7 rounded-md mt-5' >
                    <form className='' onSubmit={hendleSubmit}>
                        <div className='flex flex-col' >
                            <label className='text-blue-400 py-1' >Title</label>
                            <input
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text" className='bg-white py-3 px-4 rounded-md' placeholder='Title' />
                        </div>
                        <div className='flex flex-col mt-4 ' >
                            <label className='text-blue-400 py-1' >Message</label>
                            <textarea
                                value={Message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={10} placeholder='Message' className='px-4 py-2 rounded-md' />
                        </div>
                        <div className='flex justify-center mt-8' >
                            <button type='submit' className='bg-blue-600 text-white py-3 px-12 rounded-2xl hover:bg-blue-700 '>{
                                loading ? "Submit..." : "Submit"}</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateTicket