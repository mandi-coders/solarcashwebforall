import React from 'react'
import InnerPageHeading from '../Common/InnerPageHeading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faMoneyBillTrendUp, faSquarePollHorizontal, faTicket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function GetHelp() {
  return (
    <div className='h-[100vh]' >
      <InnerPageHeading title={"Get Help"} />
      <div className='flex justify-center'>
        <img src="\assets\getHelp.png" alt="image" className='h-[250px]'/>
      </div>
      <h3 className='font-semibold text-[20px] px-5 leading-7 py-3 text-center'>We are here to help so please get in touch with us.</h3>

      <Link to={"/CreateTicket"} className='  hover:bg-blue-800 justify-start gap-3 flex items-center  mt-4 bg-blue-700 w-[60%] mx-auto rounded-xl py-[9px] px-3' >
      <FontAwesomeIcon icon={faMoneyBillTransfer}  className='text-[35px] text-white' />
        <h3 className=' font-semibold text-xl text-white' >Create Ticket</h3>
      </Link>
      <Link to={"/viewTicket"} className='  hover:bg-blue-800 justify-start gap-5 flex items-center mt-4 bg-blue-700 w-[60%] mx-auto rounded-xl py-[9px] px-3' >
        <FontAwesomeIcon icon={faTicket} className='text-[35px] text-white' />
        <h3 className='font-semibold text-xl text-white' >View Ticket</h3>
      </Link>
    </div>
  )
}

export default GetHelp