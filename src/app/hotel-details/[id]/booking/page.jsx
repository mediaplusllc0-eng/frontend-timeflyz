"use client"
import React, { useState } from 'react'
import Navbar from "@/components/layout/Header-new";
import Button from "@/components/ui/Button";

function page() {

  const [selectedMethod, setSelectedMethod] = useState('gpay');

  let gpayIcon = <svg className='ml-[5px] mr-[2px]' width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.31103 5.1C9.31103 4.78696 9.28303 4.48746 9.23103 4.19946H5.20703V5.8495L7.52453 5.85C7.43053 6.399 7.12803 6.867 6.66453 7.179V8.2495H8.04403C8.84953 7.504 9.31103 6.402 9.31103 5.1Z" fill="#4285F4" />
    <path d="M6.6659 7.17903C6.2819 7.43803 5.7874 7.58953 5.2089 7.58953C4.09136 7.58953 3.14336 6.83653 2.80386 5.82153H1.38086V6.92553C2.08586 8.32453 3.53486 9.28453 5.2089 9.28453C6.3659 9.28453 7.3379 8.90403 8.0454 8.24903L6.6659 7.17903Z" fill="#34A853" />
    <path d="M2.6693 5.0025C2.6693 4.71748 2.7168 4.44198 2.8033 4.18298V3.07898H1.3803C1.0888 3.65748 0.924805 4.31048 0.924805 5.0025C0.924805 5.6945 1.0893 6.3475 1.3803 6.926L2.8033 5.822C2.7168 5.563 2.6693 5.2875 2.6693 5.0025Z" fill="#FABB05" />
    <path d="M5.2089 2.41497C5.8404 2.41497 6.4059 2.63247 6.8524 3.05747L8.0749 1.83597C7.3324 1.14447 6.3644 0.719971 5.2089 0.719971C3.53536 0.719971 2.08586 1.67997 1.38086 3.07897L2.80386 4.18297C3.14336 3.16797 4.09136 2.41497 5.2089 2.41497Z" fill="#E94235" />
  </svg>

  let [reserveNowBool, setReserveNowBool] = useState(false)

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nationality: "",
    number: "",
    offerCode: "",
  })

  const setValue = (name, value) => {
    let data = { ...formData }
    data[name] = value
    setFormData(data)
  }

  const reserveNow = () => {
    let { firstName, lastName, email, nationality, number } = formData
    if (firstName || lastName || email || nationality || number) {
      setReserveNowBool(true)
    }
  }

  return (
    <div className='bookingMain pb-[50px] md:pb-[100px]'>
      <Navbar />

      <div className='flex flex-wrap items-start justify-between px-5 md:px-[30px] mt-[10px] md:mt-[80px] gap-[10px]'>
        <div className='w-full md:w-[calc(100%-420px)] mt-[10px] md:mt-[30px]'>

          <div className='w-full flex flex-wrap md:flex-nowrap items-center hotelDetailTabs'>
            <a
              href='#'
              // onClick={() => setActiveTab("overview")}
              className={`active w-full md:w-[50%] text-left text-[12px] md:text-[16px] font-[500] text-[#4B4D4D] h-[40px] md:h-[70px] flex items-center`}>
              <span className='mr-[10px] h-[20px] md:h-[40px] w-[20px] md:w-[40px] rounded-[50px] bg-[#EF4A23] flex items-center justify-center text-[#FFFFFF] font-[700]'>1</span>
              Required and Review Details
            </a>
            <a
              href='#'
              // onClick={() => setActiveTab("rooms")}
              className={`${reserveNowBool ? "active" : ""} w-full md:w-[50%] text-left text-[12px] md:text-[16px] font-[500] text-[#4B4D4D] h-[40px] md:h-[70px] flex items-center`}>
              <span className='mr-[10px] h-[20px] md:h-[40px] w-[20px] md:w-[40px] rounded-[50px] bg-[#EF4A23] flex items-center justify-center text-[#FFFFFF] font-[700]'>2</span>
              Required Payment
            </a>
          </div>

          <div className='mt-5 md:mt-[30px]' id='rooms'>
            <div className='flex flex-wrap md:flex-nowrap shadow-[0_4px_10px_0_#00000026] p-[10px] rounded-[20px] mb-[20px]'>
              <div className='w-full md:w-[236px] h-[175px]'>
                <img alt='timeflyz' src='/img/hotelDetail1.png' className='w-full md:w-auto h-full rounded-[12px] overflow-hidden' />
              </div>
              <div className='w-full md:w-[calc(100%-159px)] flex justify-between md:px-[20px] py-[10px]'>
                <div className=''>
                  <div className='flex items-center gap-[5px] mb-[5px]'>
                    <div className='flex items-center'>
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#4B4D4D" />
                      </svg>
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#4B4D4D" />
                      </svg>
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#4B4D4D" />
                      </svg>
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#4B4D4D" />
                      </svg>
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#4B4D4D" />
                      </svg>
                    </div>
                    <span className='text-[#6B6B6B] text-[12px] font-[400]'>Hotel</span>
                  </div>
                  <h3 className='text-[20px] text-[#4B4D4D] font-[700] mb-[5px]'>Deluxe King Room</h3>
                  <p className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mb-[5px]'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.0002 13.3334V11.9803C11.0002 11.1521 10.6273 10.34 9.8737 9.99644C8.9545 9.57744 7.8521 9.33337 6.66683 9.33337C5.48158 9.33337 4.37916 9.57744 3.45995 9.99644C2.70634 10.34 2.3335 11.1521 2.3335 11.9803V13.3334" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.6667 13.334V11.9809C13.6667 11.1527 13.2938 10.3406 12.5402 9.99709C12.3665 9.91789 12.1861 9.84489 12 9.77869" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.66683 7.33329C7.95549 7.33329 9.00016 6.28862 9.00016 4.99996C9.00016 3.71129 7.95549 2.66663 6.66683 2.66663C5.37816 2.66663 4.3335 3.71129 4.3335 4.99996C4.3335 6.28862 5.37816 7.33329 6.66683 7.33329Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 2.76306C10.9638 3.04991 11.6667 3.94276 11.6667 4.99977C11.6667 6.05678 10.9638 6.94964 10 7.23651" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    2 Guests
                  </p>
                  <p className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mb-[5px]'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6668 11.6666H1.3335" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.6668 14V10.6667C14.6668 9.4096 14.6668 8.78107 14.2763 8.39053C13.8858 8 13.2572 8 12.0002 8H4.00016C2.74308 8 2.11454 8 1.72402 8.39053C1.3335 8.78107 1.3335 9.4096 1.3335 10.6667V14" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.33333 8V6.80893C7.33333 6.55515 7.2952 6.47027 7.0998 6.37025C6.693 6.16195 6.1991 6 5.66667 6C5.13423 6 4.64037 6.16195 4.2335 6.37025C4.03814 6.47027 4 6.55515 4 6.80893V8" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M11.9998 8V6.80893C11.9998 6.55515 11.9617 6.47027 11.7663 6.37025C11.3595 6.16195 10.8656 6 10.3332 6C9.8007 6 9.30684 6.16195 8.90004 6.37025C8.70464 6.47027 8.6665 6.55515 8.6665 6.80893V8" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M14 8V4.90705C14 4.44595 14 4.21541 13.8719 3.99769C13.7438 3.77997 13.5613 3.66727 13.1963 3.44189C11.7246 2.53319 9.93287 2 8 2C6.06711 2 4.27543 2.53319 2.80372 3.44189C2.43869 3.66727 2.25618 3.77997 2.12809 3.99769C2 4.21541 2 4.44595 2 4.90705V8" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Extra king size
                  </p>
                  <p className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mb-[5px]'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.2302 1.65192C7.60587 1.43955 7.79373 1.33337 8 1.33337C8.20627 1.33337 8.39413 1.43955 8.7698 1.65192L13.2302 4.17326C13.6059 4.38563 13.7937 4.49181 13.8969 4.66671C14 4.8416 14 5.05397 14 5.4787V10.5214C14 10.9461 14 11.1585 13.8969 11.3334C13.7937 11.5082 13.6059 11.6144 13.2302 11.8268L8.7698 14.3482C8.39413 14.5605 8.20627 14.6667 8 14.6667C7.79373 14.6667 7.60587 14.5605 7.2302 14.3482L2.7698 11.8268C2.39411 11.6144 2.20627 11.5082 2.10313 11.3334C2 11.1585 2 10.9461 2 10.5214V5.4787C2 5.05397 2 4.8416 2.10313 4.66671C2.20627 4.49181 2.39411 4.38563 2.7698 4.17326L7.2302 1.65192Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.3332 2.84705L8.75584 3.70045C8.3867 3.90017 8.20217 4.00003 7.99984 4.00003C7.7975 4.00003 7.61297 3.90017 7.24384 3.70045L5.6665 2.84705" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.00016 7.74356V14.6666M8.00016 7.74356L13.6668 4.66663M8.00016 7.74356L2.3335 4.66663" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 8L3.92962 9.039C4.28823 9.23213 4.46753 9.32867 4.5671 9.50213C4.66667 9.67567 4.66667 9.89153 4.66667 10.3233V12.6667" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.0002 8L12.0706 9.039C11.712 9.23213 11.5326 9.32867 11.433 9.50213C11.3335 9.67567 11.3335 9.89153 11.3335 10.3233V12.6667" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    32 m2
                  </p>

                </div>
                <div className='h-full flex flex-col justify-between'>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8813 26.6236C10.1196 23.8107 2.66699 17.3797 2.66699 11.5926C2.66699 7.76751 5.47401 4.66667 9.33366 4.66667C11.3337 4.66667 13.3337 5.33334 16.0003 8.00001C18.667 5.33334 20.667 4.66667 22.667 4.66667C26.5266 4.66667 29.3337 7.76751 29.3337 11.5926C29.3337 17.3797 21.8811 23.8107 18.1194 26.6236C16.8535 27.5701 15.1471 27.5701 13.8813 26.6236Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-[30px]'>
            <h4 className='text-[20px] text-[#4B4D4D] font-[600]'>Your Information</h4>

            <div className='flex flex-wrap justify-between items-center gap-y-[10px] mt-[10px]'>
              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">First name</label>
                <input
                  type='text'
                  placeholder='Enter name'
                  onChange={(e) => setValue("firstName", e.target.value)}
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Last name</label>
                <input
                  type='text'
                  placeholder='Enter name'
                  onChange={(e) => setValue("lastName", e.target.value)}
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Email</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  onChange={(e) => setValue("email", e.target.value)}
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Nationality</label>
                <select
                  type='text'
                  placeholder='Select nationality'
                  onChange={(e) => setValue("nationality", e.target.value)}
                  className="ml-[-5px] outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer">
                  <option>Lorem ipsum 1</option>
                  <option>Lorem ipsum 2</option>
                  <option>Lorem ipsum 3</option>
                </select>
              </div>

              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Phone number</label>
                <input
                  type='number'
                  placeholder='+971'
                  onChange={(e) => setValue("number", e.target.value)}
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="relative mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col justify-center rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <input
                  type='number'
                  placeholder='Offer code'
                  onChange={(e) => setValue("offerCode", e.target.value)}
                  className="no-spinner outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                <span className='text-[#EF4A23] text-[16px] font-[700] absolute top-[20px] right-[20px]'>
                  Apply
                </span>
              </div>
            </div>
          </div>

          <div className='w-full mt-[20px]'>
            <p className='text-[#6B6B6B] text-[16px] font-[400]'>By completing this booking you agree to the <a className='text-[#EF4A23]' >terms and condition</a> and <a className='text-[#EF4A23]'>privacy policy</a></p>
          </div>

          {reserveNowBool &&
            <div className="w-full mx-auto space-y-[20px] mt-[50px]">
              <label
                className={`px-[20px] h-[60px] rounded-[12px] flex items-center justify-between cursor-pointer transition border-[1px] border-[#CECECE] '`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="gpay"
                    checked={selectedMethod === 'gpay'}
                    onChange={() => setSelectedMethod('gpay')}
                    className={`
    appearance-none w-[20px] h-[20px] rounded-full border-5
    transition duration-200
    border-[#E4E4E4]
    bg-[#E4E4E4]
    checked:border-[#EF4A23] checked:bg-[#fff]
  `}
                  />
                  <span className="text-[#4B4D4D] text-[16px] font-[500]">Google Pay</span>
                </div>
                <svg width="38" height="20" viewBox="0 0 38 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_252_490)">
                    <path d="M27.8002 0H10.2002C4.7002 0 0.200195 4.5 0.200195 10C0.200195 15.5 4.7002 20 10.2002 20H27.8002C33.3002 20 37.8002 15.5 37.8002 10C37.8002 4.5 33.3002 0 27.8002 0Z" fill="white" />
                    <path d="M27.8002 0.81C29.0352 0.81 30.2352 1.055 31.3652 1.535C32.4602 2 33.4402 2.665 34.2902 3.51C35.1352 4.355 35.8002 5.34 36.2652 6.435C36.7452 7.565 36.9902 8.765 36.9902 10C36.9902 11.235 36.7452 12.435 36.2652 13.565C35.8002 14.66 35.1352 15.64 34.2902 16.49C33.4452 17.335 32.4602 18 31.3652 18.465C30.2352 18.945 29.0352 19.19 27.8002 19.19H10.2002C8.96519 19.19 7.76519 18.945 6.63519 18.465C5.54019 18 4.56019 17.335 3.71019 16.49C2.86519 15.645 2.20019 14.66 1.73519 13.565C1.25519 12.435 1.0102 11.235 1.0102 10C1.0102 8.765 1.25519 7.565 1.73519 6.435C2.20019 5.34 2.86519 4.36 3.71019 3.51C4.55519 2.665 5.54019 2 6.63519 1.535C7.76519 1.055 8.96519 0.81 10.2002 0.81H27.8002ZM27.8002 0H10.2002C4.7002 0 0.200195 4.5 0.200195 10C0.200195 15.5 4.7002 20 10.2002 20H27.8002C33.3002 20 37.8002 15.5 37.8002 10C37.8002 4.5 33.3002 0 27.8002 0Z" fill="#3C4043" />
                    <path d="M18.1299 10.7099V13.7349H17.1699V6.26489H19.7149C20.3599 6.26489 20.9099 6.47989 21.3599 6.90989C21.8199 7.3399 22.0499 7.8649 22.0499 8.4849C22.0499 9.1199 21.8199 9.64489 21.3599 10.0699C20.9149 10.4949 20.3649 10.7049 19.7149 10.7049H18.1299V10.7099ZM18.1299 7.18489V9.78989H19.7349C20.1149 9.78989 20.4349 9.6599 20.6849 9.4049C20.9399 9.1499 21.0699 8.83989 21.0699 8.48989C21.0699 8.14489 20.9399 7.8399 20.6849 7.5849C20.4349 7.31989 20.1199 7.18989 19.7349 7.18989H18.1299V7.18489Z" fill="#3C4043" />
                    <path d="M24.5601 8.45508C25.2701 8.45508 25.8301 8.64508 26.2401 9.02508C26.6501 9.40508 26.8551 9.92508 26.8551 10.5851V13.7351H25.9401V13.0251H25.9001C25.5051 13.6101 24.9751 13.9001 24.3151 13.9001C23.7501 13.9001 23.2801 13.7351 22.9001 13.4001C22.5201 13.0651 22.3301 12.6501 22.3301 12.1501C22.3301 11.6201 22.5301 11.2001 22.9301 10.8901C23.3301 10.5751 23.8651 10.4201 24.5301 10.4201C25.1001 10.4201 25.5701 10.5251 25.9351 10.7351V10.5151C25.9351 10.1801 25.8051 9.90007 25.5401 9.66507C25.2751 9.43007 24.9651 9.31507 24.6101 9.31507C24.0751 9.31507 23.6501 9.54008 23.3401 9.99508L22.4951 9.46507C22.9601 8.79008 23.6501 8.45508 24.5601 8.45508ZM23.3201 12.1651C23.3201 12.4151 23.4251 12.6251 23.6401 12.7901C23.8501 12.9551 24.1001 13.0401 24.3851 13.0401C24.7901 13.0401 25.1501 12.8901 25.4651 12.5901C25.7801 12.2901 25.9401 11.9401 25.9401 11.5351C25.6401 11.3001 25.2251 11.1801 24.6901 11.1801C24.3001 11.1801 23.9751 11.2751 23.7151 11.4601C23.4501 11.6551 23.3201 11.8901 23.3201 12.1651Z" fill="#3C4043" />
                    <path d="M32.0748 8.62012L28.8748 15.9801H27.8848L29.0748 13.4051L26.9648 8.62012H28.0098L29.5298 12.2901H29.5498L31.0298 8.62012H32.0748Z" fill="#3C4043" />
                    <path d="M14.311 10.1C14.311 9.78696 14.283 9.48746 14.231 9.19946H10.207V10.8495L12.5245 10.85C12.4305 11.399 12.128 11.867 11.6645 12.179V13.2495H13.044C13.8495 12.504 14.311 11.402 14.311 10.1Z" fill="#4285F4" />
                    <path d="M11.6659 12.179C11.2819 12.438 10.7874 12.5895 10.2089 12.5895C9.09136 12.5895 8.14336 11.8365 7.80386 10.8215H6.38086V11.9255C7.08586 13.3245 8.53486 14.2845 10.2089 14.2845C11.3659 14.2845 12.3379 13.904 13.0454 13.249L11.6659 12.179Z" fill="#34A853" />
                    <path d="M7.6693 10.0026C7.6693 9.7176 7.7168 9.4421 7.8033 9.1831V8.0791H6.3803C6.0888 8.6576 5.9248 9.3106 5.9248 10.0026C5.9248 10.6946 6.0893 11.3476 6.3803 11.9261L7.8033 10.8221C7.7168 10.5631 7.6693 10.2876 7.6693 10.0026Z" fill="#FABB05" />
                    <path d="M10.2089 7.41497C10.8404 7.41497 11.4059 7.63247 11.8524 8.05747L13.0749 6.83597C12.3324 6.14447 11.3644 5.71997 10.2089 5.71997C8.53536 5.71997 7.08586 6.67997 6.38086 8.07897L7.80386 9.18297C8.14336 8.16797 9.09136 7.41497 10.2089 7.41497Z" fill="#E94235" />
                  </g>
                  <defs>
                    <clipPath id="clip0_252_490">
                      <rect width="38" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              </label>

              <label
                className={`px-[20px] h-[60px] rounded-[12px] flex items-center justify-between cursor-pointer transition border-[1px] border-[#CECECE] '`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedMethod === 'card'}
                    onChange={() => setSelectedMethod('card')}
                    className={`
    appearance-none w-[20px] h-[20px] rounded-full border-5
    transition duration-200
    border-[#E4E4E4]
    bg-[#E4E4E4]
    checked:border-[#EF4A23] checked:bg-[#fff]
  `}
                  />
                  <span className="text-[#4B4D4D] text-[16px] font-[500]">Credit or Debit card</span>
                </div>
                <div className="flex space-x-2">
                  <svg width="85" height="16" viewBox="0 0 85 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_252_500)">
                      <mask id="mask0_252_500" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="16">
                        <path d="M24.4697 0H0.469727V16H24.4697V0Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_252_500)">
                        <path d="M16.1887 4C14.2666 4 12.9165 5.02183 12.9046 6.48292C12.8924 7.56534 13.8701 8.16889 14.6055 8.52863C15.3641 8.8964 15.6175 9.13274 15.615 9.46176C15.6075 9.96608 15.008 10.1958 14.4509 10.1958C13.6742 10.1958 13.2601 10.0824 12.6237 9.80252L12.3713 9.68257L12.0995 11.3666C12.5539 11.5761 13.3931 11.7577 14.2654 11.7672C16.3051 11.7672 17.6321 10.7571 17.6479 9.19746C17.6559 8.33896 17.137 7.68923 16.0149 7.15278C15.3375 6.80399 14.9187 6.57272 14.9249 6.2193C14.9255 5.90703 15.2764 5.57236 16.0382 5.57236C16.6744 5.56165 17.132 5.70769 17.4923 5.86151L17.6656 5.94797L17.9299 4.31668C17.546 4.16502 16.9402 4 16.1887 4ZM10.1549 4.13124L8.93927 11.6559H10.8815L12.0979 4.13116L10.1549 4.13124ZM7.30944 4.13854L5.40752 9.26687L5.20477 8.22482C4.73113 6.94702 3.70579 5.60667 2.51172 5.06345L4.2515 11.6488L6.30818 11.6478L9.36663 4.1386L7.30944 4.13854ZM21.4122 4.13903C20.9468 4.13903 20.5981 4.27168 20.3927 4.76358L17.5085 11.6584H19.5491C19.5491 11.6584 19.8828 10.7303 19.9582 10.5272C20.1809 10.5272 22.1629 10.5314 22.4457 10.5314C22.5058 10.7938 22.6823 11.6583 22.6823 11.6583H24.4866L22.9133 4.13903H21.4122ZM21.5495 6.16769L21.679 6.81638C21.679 6.81638 22.0523 8.61177 22.1302 8.9878H20.5173C20.6786 8.55602 21.2913 6.88451 21.2913 6.88451C21.2793 6.90495 21.4506 6.4493 21.5495 6.16769Z" fill="#0023A0" />
                        <path d="M3.64414 4.13454H0.510442L0.492188 4.26403C2.92858 4.88713 4.53596 6.41728 5.20524 8.22673L4.52422 4.76834C4.40716 4.29272 4.06618 4.15134 3.64414 4.13454Z" fill="#0023A0" />
                      </g>
                      <path d="M46.8594 2.49731H40.7344V13.5028H46.8594V2.49731Z" fill="#FF5F00" />
                      <path d="M41.1225 8C41.1225 5.76389 42.1725 3.78055 43.7864 2.49722C42.6002 1.56389 41.103 1 39.4697 1C35.6002 1 32.4697 4.13055 32.4697 8C32.4697 11.8694 35.6002 15 39.4697 15C41.103 15 42.6002 14.4361 43.7864 13.5027C42.1725 12.2389 41.1225 10.2361 41.1225 8Z" fill="#EB001B" />
                      <path d="M55.1224 8C55.1224 11.8694 51.9918 15 48.1224 15C46.4891 15 44.9918 14.4361 43.8057 13.5028C45.4391 12.2194 46.4696 10.2361 46.4696 8C46.4696 5.76389 45.4196 3.78056 43.8057 2.49722C44.9918 1.56389 46.4891 1 48.1224 1C51.9918 1 55.1224 4.15 55.1224 8Z" fill="#F79E1B" />
                      <path d="M83.171 13.4693L82.2003 12.3867L81.1923 13.4693H79.2136H74.9576V8.42933H72.979L75.4431 2.792H77.8323L78.691 4.73333V2.792H81.6776L82.2003 4.248L82.723 2.792H85.0003V1.93333C85.0003 1.41067 84.5897 1 84.0671 1H64.0563C63.5336 1 63.123 1.41067 63.123 1.93333V14.0667C63.123 14.5893 63.5336 15 64.0563 15H84.0671C84.5897 15 85.0003 14.5893 85.0003 14.0667V13.4693H83.171Z" fill="#0071CE" />
                      <path d="M83.4319 12.8719H84.9999L82.9466 10.6692L84.9999 8.50391H83.4692L82.1626 9.92257L80.8932 8.50391H79.3252L81.4159 10.7065L79.3252 12.8719H80.8559L82.1626 11.4532L83.4319 12.8719Z" fill="#0071CE" />
                      <path d="M76.8236 11.8639V11.1919H79.2876V10.1839H76.8236V9.51191H79.3249V8.50391H75.6289V12.8719H79.3249V11.8639H76.8236Z" fill="#0071CE" />
                      <path d="M83.8426 7.86944H84.9626V3.46411L83.1706 3.50144L82.1999 6.22678L81.1919 3.50144H79.3252V7.86944H80.5199V4.80811L81.6399 7.86944H82.6852L83.8426 4.80811V7.86944Z" fill="#0071CE" />
                      <path d="M77.4212 3.50122H75.8906L73.9492 7.86922H75.2559L75.6292 7.01056H77.6452L78.0186 7.86922H79.3626L77.4212 3.50122ZM76.0399 6.00256L76.6372 4.58389L77.2346 6.00256H76.0399Z" fill="#0071CE" />
                      <path d="M83.917 10.5575L84.9997 11.7522V9.36279L83.917 10.5575Z" fill="#0071CE" />
                    </g>
                    <defs>
                      <clipPath id="clip0_252_500">
                        <rect width="85" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </label>

              {selectedMethod === 'card' && (
                <div className='flex flex-wrap justify-between items-center gap-y-[10px] mt-[10px]'>
                  <div
                    tabIndex={0}
                    className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                    <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Card holder name</label>
                    <input
                      type='text'
                      placeholder='Enter name'
                      className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                  </div>

                  <div
                    tabIndex={0}
                    className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                    <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Card number</label>
                    <input
                      type='number'
                      placeholder='0000 0000 0000 0000'
                      className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                  </div>

                  <div
                    tabIndex={0}
                    className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                    <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">CVC / CVV</label>
                    <input
                      type='number'
                      placeholder='***'
                      className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                  </div>

                  <div
                    tabIndex={0}
                    className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                    <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Expiry date</label>
                    <input
                      type='date'
                      placeholder='MM / YY'
                      className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                  </div>

                  <div className='w-full'>
                    <Button fullWidth={false} className="w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]">Pay Now</Button>
                  </div>
                </div>
              )}

              {selectedMethod !== 'card' && (
                <button className="mx-auto mt-[10px] w-[320px] h-[48px] py-3 rounded-full bg-black text-white font-semibold flex items-center justify-center space-x-2 hover:bg-gray-900 transition">

                  <span>
                    {selectedMethod === 'gpay' ?
                      <p className='flex items-center justify-center'>
                        Pay with {gpayIcon} Pay
                      </p>
                      :
                      'Pay with Card'}
                  </span>
                </button>
              )}
            </div>
          }
        </div>

        <div className='w-full md:w-[390px] h-auto bg-[#F4F4F4] rounded-[12px] sticky top-[90px] mt-[30px] p-[15px] md:p-[30px]'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <h5 className='flex items-center gap-1 text-[#4B4D4D] text-[16px] font-[700] mb-[5px]'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2V6M8 2V6" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 16V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H12" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 10H21" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 19.5H14.5M16.5 22C15.9943 21.5085 14 20.2002 14 19.5C14 18.7998 15.9943 17.4915 16.5 17" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Check in
              </h5>
              <p className='text-[#4B4D4D] text-[16px] font-[400]'>05 Aug, 11:00 AM</p>
            </div>
            <div className='flex flex-col'>
              <h5 className='flex items-center gap-1 text-[#4B4D4D] text-[16px] font-[700]'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2V6M8 2V6" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 10H21" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.5 18.5C14.0057 18.0085 16 16.7002 16 16C16 15.2998 14.0057 13.9915 13.5 13.5M15.5 16H9" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Check out
              </h5>
              <p className='text-[#4B4D4D] text-[16px] font-[400]'>05 Aug, 03:00 PM</p>
            </div>
          </div>

          <div className='h-[1px] bg-[#CECECE] my-[10px]' />

          <div className='flex flex-col'>
            <h5 className='flex items-center gap-1 text-[#4B4D4D] text-[16px] font-[700] mb-[5px]'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 20V17.9704C16.5 16.7281 15.9407 15.5099 14.8103 14.9946C13.4315 14.3661 11.7779 14 10 14C8.22212 14 6.5685 14.3661 5.18968 14.9946C4.05927 15.5099 3.5 16.7281 3.5 17.9704V20" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.5 20.001V17.9713C20.5 16.729 19.9407 15.5109 18.8103 14.9956C18.5497 14.8768 18.2792 14.7673 18 14.668" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 11C11.933 11 13.5 9.433 13.5 7.5C13.5 5.567 11.933 4 10 4C8.067 4 6.5 5.567 6.5 7.5C6.5 9.433 8.067 11 10 11Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              2 Guests
            </h5>
            <p className='text-[#4B4D4D] text-[16px] font-[400]'>Deluxe king room</p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'><span>Total hours</span><span>4 Hours</span></p>
          </div>

          <div className='h-[1px] bg-[#CECECE] my-[10px]' />

          <div className='flex flex-col'>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Room price</span>
              <span>AED 150</span>
            </p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Tourism fee</span>
              <span>AED 10</span>
            </p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>VAT</span>
              <span>AED 15</span>
            </p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Service Charge</span>
              <span>AED 05</span>
            </p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Municipality fee</span>
              <span>AED 02</span>
            </p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Discount 30%</span>
              <span className='text-[#29AF52] text-[16px] font-[700]' >- AED 52.5</span>
            </p>
          </div>

          <div className='flex flex-col mt-[20px]'>
            <p className='text-[#4B4D4D] text-[24px] font-[700] flex justify-between items-center'>
              <span>Total price</span>
              <span className='text-[#EF4A23]'><span className='text-[16px] text-[#4B4D4D]'>AED</span> 122.5</span>
            </p>
          </div>

          <div className='h-[1px] bg-[#CECECE] my-[10px]' />

          <Button onClick={reserveNow} fullWidth={false} className="w-full md:w-full rounded-[12px] h-[60px] mt-[10px]">Reserve Now</Button>

          <p className='text-[#6B6B6B] text-[12px] font-[400] mt-[10px] text-center'>
            Lorem ipsum dolor sit amet consectetur. Vitae ultrices tempor congue tortor vitae ac at semper odio. Pharetra feugiat sem sit vestibulum.
          </p>
        </div>
      </div>
    </div>
  )
}

export default page