import React from 'react'
import Button from "@/components/ui/Button";


function CTA() {
    return (
        <div className='px-5 md:px-[30px] md:py-[80px] py-[30px]'>
            <div className='w-full md:h-[280px] bg-[#FED1C7] rounded-[20px] p-5 md:p-[40px] flex justify-between items-center flex-wrap md:flex-nowrap'>
                <h2 className='relative text-[#4B4D4D] text-[28px] md:text-[55px] font-[700] w-fit'>
                    Enjoy your <br /> exclusive offers
                    <svg className='w-20 md:w-auto absolute top-[-40px] right-[-80px]' width="126" height="126" viewBox="0 0 126 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_55_473)">
                            <path d="M89.7033 32.3981C80.909 47.3893 113.228 57.3548 107.014 71.2372C103.439 79.2251 90.5802 81.1089 80.0538 75.5197" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" />
                            <path d="M57.3576 72.3145C58.7092 71.9663 61.2593 71.5728 62.4704 68.9687M62.4704 68.9687C62.8455 68.1628 63.0922 67.1449 63.1354 65.8517C63.2907 61.2226 56.7631 57.6539 53.4052 62.6921C51.6 65.4005 51.3293 67.135 48.5385 67.8595C46.5754 68.369 43.9588 67.1072 42.4021 64.8486C41.0493 62.8866 41.1781 60.2112 42.3944 58.1613C43.8791 55.6586 45.8876 55.2311 46.7327 54.9473M62.4704 68.9687L65.4713 70.5309M42.1885 58.4076L39.339 56.9237" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M92.1845 80.9224C92.6373 84.823 90.5748 86.38 84.476 89.5093C78.9835 92.3278 72.1054 94.8006 69.1404 95.7351C68.0158 95.9786 66.8548 95.8518 65.7969 95.3966C55.3136 90.2468 35.2839 79.7818 25.2957 74.462C21.6442 72.2896 20.1482 67.7471 21.6144 63.7581C25.4531 55.3262 30.1436 46.9088 34.2264 38.8245C36.6429 35.3321 41.2094 33.9568 45.0767 35.7134C56.0985 41.1978 75.2158 51.3825 85.833 57.1868C86.8112 57.796 87.5807 58.6775 88.0265 59.7415C88.6156 61.6091 89.3744 64.892 90.1772 68.0702" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_55_473">
                                <rect width="100" height="100" fill="white" transform="translate(95.6572) rotate(72.5061)" />
                            </clipPath>
                        </defs>
                    </svg>

                </h2>

                <div className='md:pr-[63px] w-full md:w-auto'>
                    <p className='relative md:text-[20px] text-[#000] font-[400]'>
                        Discover our exclusive offers in advance by<br className='hidden md:block' /> subscribing to our newsletter
                        <svg className='hidden md:block absolute top-[-40px] right-[-80px]' width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.1096 15.4174C40.7639 28.3114 59.9837 0.482857 71.3562 10.5822C77.8999 16.3932 75.8312 29.2238 67.3362 37.5832" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" />
                            <path d="M57.457 58.2663C57.5312 56.8725 57.9224 54.3221 55.8028 52.3842M55.8028 52.3842C55.147 51.7842 54.2503 51.2429 53.0299 50.8129C48.6616 49.2734 43.2957 54.4263 47.0916 59.1434C49.132 61.6792 50.7049 62.4588 50.557 65.3384C50.4528 67.3638 48.4628 69.48 45.8407 70.2859C43.5628 70.9863 41.0498 70.0592 39.4604 68.2829C37.5197 66.1146 37.7157 64.0705 37.6992 63.1792M55.8028 52.3842L58.1949 49.9917M39.6334 68.5534L37.3616 70.825" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M76.1359 27.6377C79.9922 28.3783 80.8572 30.8135 82.0084 37.571C83.0455 43.6567 83.3363 50.96 83.3363 54.0687C83.2305 55.2146 82.7605 56.2837 82.0084 57.1558C73.9455 65.6062 57.9434 81.5637 49.8671 89.4908C46.6976 92.3204 41.9155 92.3817 38.5518 89.7842C31.6637 83.5883 25.0457 76.5846 18.5626 70.2604C15.9581 66.9058 16.0191 62.1371 18.857 58.9767C27.4009 50.1133 42.8613 34.9417 51.5888 26.5604C52.4638 25.8106 53.5359 25.3416 54.6847 25.2363C56.643 25.2358 60.0022 25.499 63.2747 25.6887" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </p>
                    <div className='flex-wrap md:flex-nowrap flex items-center gap-[10px] mt-[15px]'>
                        <div className="w-full inputDiv flex flex-col rounded-[12px] bg-[#fff] py-[12px] px-[16px] md:w-[334px] h-[60px]">
                            <label className="m-0 mt-[-2.5px]">Email</label>
                            <input
                                type='email'
                                className="border-0 outline-0 mt-[-5px]"
                                placeholder="Enter email"
                            />
                        </div>
                        <Button fullWidth={false} className="w-full mx-auto text-md capitalize md:w-[163px] h-[60px] rounded-[12px]">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CTA