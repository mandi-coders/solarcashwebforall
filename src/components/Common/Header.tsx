import React from 'react';
// import logo from "../../assets/logo1.png";

function Header({title,logo}) {
  return (
    <>
         <div className="text-center sticky top-0 z-10 w-[100vw] sm:w-[400px] flex justify-center items-center bg-blue-600 text-[19px] py-3 text-white font-semibold">
          <div className="flex justify-center items-center w-[40px] h-[40px] bg-white rounded-full absolute left-3 ">
            <img
              src={logo}
              alt="logo"
              className="w-[100%] "
            />
          </div>
          <span>{title}</span>
        </div>
    </>
  )
}

export default Header
