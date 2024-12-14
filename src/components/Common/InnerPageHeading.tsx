import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function InnerPageHeading({title}) {
  return (
    <div className='flex px-4 justify-center items-center bg-blue-600 relative h-[7vh]' >
      {/* @ts-ignore */}
      <Link to={-1} >
        <FontAwesomeIcon icon={faArrowLeft} className='absolute top-1/2 left-3 transform -translate-y-1/2 text-white text-lg'  />
        </Link>
        <h1 className='text-white font-semibold text-xl'>{title}</h1>
    </div>
  )
}

export default InnerPageHeading