import React from 'react'
import Navbar from "@/components/layout/Header-new";
import Button from "@/components/ui/Button";

function page() {
  return (
    <div className='bookingMain'>
      <Navbar />

      <div className='flex flex-wrap items-start justify-between px-[30px] mt-[80px] gap-[10px]'>
        <div className='w-[calc(100%-420px)] mt-[30px]'>

          <div className='w-full flex items-center hotelDetailTabs'>
            <a
              href='#overview'
              // onClick={() => setActiveTab("overview")}
              className={`active w-[50%] text-left text-[16px] font-[500] text-[#4B4D4D] h-[60px] flex items-center`}>
              <span className='mr-[10px] h-[40px] w-[40px] rounded-[50px] bg-[#EF4A23] flex items-center justify-center text-[#FFFFFF] font-[700]'>1</span>
              Required and Review Details
            </a>
            <a
              href='#rooms'
              // onClick={() => setActiveTab("rooms")}
              className={`w-[50%] text-left text-[16px] font-[500] text-[#4B4D4D] h-[60px] flex items-center`}>
              <span className='mr-[10px] h-[40px] w-[40px] rounded-[50px] bg-[#EF4A23] flex items-center justify-center text-[#FFFFFF] font-[700]'>2</span>
              Required Payment
            </a>
          </div>

          <div className='mt-[30px]' id='rooms'>
            <div className='flex shadow-[0_4px_10px_0_#00000026] p-[10px] rounded-[20px] mb-[20px]'>
              <div className='w-[236px] h-[175px]'>
                <img src='/img/hotelDetail1.png' className='h-full rounded-[12px] overflow-hidden' />
              </div>
              <div className='w-[calc(100%-159px)] flex justify-between px-[20px] py-[10px]'>
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
                    <path d="M13.8813 26.6236C10.1196 23.8107 2.66699 17.3797 2.66699 11.5926C2.66699 7.76751 5.47401 4.66667 9.33366 4.66667C11.3337 4.66667 13.3337 5.33334 16.0003 8.00001C18.667 5.33334 20.667 4.66667 22.667 4.66667C26.5266 4.66667 29.3337 7.76751 29.3337 11.5926C29.3337 17.3797 21.8811 23.8107 18.1194 26.6236C16.8535 27.5701 15.1471 27.5701 13.8813 26.6236Z" stroke="#4B4D4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Last name</label>
                <input
                  type='text'
                  placeholder='Enter name'
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Email</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Nationality</label>
                <select
                  type='text'
                  placeholder='Select nationality'
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
                  className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
              </div>

              <div
                tabIndex={0}
                className="relative mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col justify-center rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(33.3%-5px)] h-[60px]">
                <input
                  type='number'
                  placeholder='Offer code'
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
        </div>

        <div className='w-[390px] h-[548px] bg-[#F4F4F4] rounded-[12px] sticky top-[90px] mt-[30px] p-[30px]'>
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
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'><span>Deluxe king room</span><span>4 Hours</span></p>
          </div>

          <div className='h-[1px] bg-[#CECECE] my-[10px]' />

          <div className='flex flex-col'>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Room price</span>
              <span>AED 150</span>
            </p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Convenience fee</span>
              <span>AED 10</span>
            </p>
            <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
              <span>Taxes and fees</span>
              <span>AED 15</span>
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

          <Button fullWidth={false} className="w-full md:w-full rounded-[12px] h-[60px] mt-[10px]">Reserve Now</Button>

          <p className='text-[#6B6B6B] text-[12px] font-[400] mt-[10px] text-center'>
            Lorem ipsum dolor sit amet consectetur. Vitae ultrices tempor congue tortor vitae ac at semper odio. Pharetra feugiat sem sit vestibulum.
          </p>
        </div>
      </div>
    </div>
  )
}

export default page