/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";


import Logo from "../../assets/png/logo-no-background.png"

const Header = ({page}) => {

const navigate = useNavigate();

  return (
    <div className="header h-[84px] mobile:max-tablet:h-[70px] z-40 bg-white shadow-black/10 shadow backdrop-blur-md filter w-[100vw] px-10 mobile:max-tablet:px-5 py-4 mobile:max-tablet:py-3 flex items-center justify-between">
      <div className="logo h-[30px] mobile:max-tablet:h-[25px]">
        <img src={Logo} className="object-fill h-[100%] filter hover:cursor-pointer" onClick={()=>{
          navigate("/")
        }}/>
      </div>

      {!page && <button className=" mobile:max-tablet:h-[40px] mobile:max-tablet:w-[120px] relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-[#000] rounded-full shadow-md group" 
      onClick={()=>{
        navigate("/createPost")
      }}
      >
<span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-[#000] group-hover:translate-x-0 ease">
<svg className="w-6 h-6 mobile:max-tablet:hidden" color="white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease ">Create Post</span>
<span className="relative invisible ">Create Post</span>
</button>}
    </div>
  )
}

export default Header