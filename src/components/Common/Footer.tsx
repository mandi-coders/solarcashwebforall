import { Link, useLocation } from "react-router-dom";
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChartSimple, faBookmark, faUser, faShare, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import useModalStore from "../../Store/ModalTogal";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

   //@ts-ignore
   const { isModalVisible, hideModal,showModal } = useModalStore();

  return (
    <div className={`flex justify-around py-2 ${isModalVisible?"hidden":"block"}  fixed w-[100vw] sm:w-[400px] bottom-0 rounded-t-3xl bg-[#ddd]`}>
      <Link to="/home" className={`flex flex-col ${isActive("/") ? "text-blue-500 " : "text-gray-600  "}`}>
        <FontAwesomeIcon icon={faHouse} className={`text-[19px] ${isActive("/home") ? "text-blue-500" : ""}`} />
        <span className={`text-[14px] ${isActive("/home") ? "text-blue-500" : ""}`}>Home</span>
      </Link>

      <Link to="/invest" className={`flex flex-col ${isActive("/invest") ? "text-blue-500" : "text-gray-600 "}`}>
        <FontAwesomeIcon icon={faChartSimple} className={`text-[19px] ${isActive("/invest") ? "text-blue-500" : ""}`} />
        <span className={`text-[14px] ${isActive("/invest") ? "text-blue-500" : ""}`}>Invest</span>
      </Link>

      <Link to="/purchased" className={`flex flex-col ${isActive("/purchased") ? "text-blue-500" : "text-gray-600"}`}>
        <FontAwesomeIcon icon={faBookmark} className={`text-[19px] ${isActive("/purchased") ? "text-blue-500" : ""}`} />
        <span className={`text-[14px] ${isActive("/purchased") ? "text-blue-500" : ""}`}>Purchase</span>
      </Link>

      <Link to="/share" className={`flex flex-col ${isActive("/share") ? "text-blue-500" : "text-gray-600"}`}>
        <FontAwesomeIcon icon={faShareNodes} className={`text-[19px] ${isActive("/share") ? "text-blue-500" : ""}`} />
        <span className={`text-[14px] ${isActive("/share") ? "text-blue-500" : ""}`}>Share</span>
      </Link>

      <Link to="/My" className={`flex flex-col ${isActive("/My") ? "text-blue-500" : "text-gray-600"}`}>
        <FontAwesomeIcon icon={faUser} className={`text-[19px] ${isActive("/My") ? "text-blue-500" : ""}`} />
        <span className={`text-[14px] ${isActive("/My") ? "text-blue-500" : ""}`}>My</span>
      </Link>
    </div>
  );
};

export default Navigation;
