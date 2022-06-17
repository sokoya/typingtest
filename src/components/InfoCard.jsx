import React from 'react'
import { useNavigate } from 'react-router-dom'


const InfoCard = ({ title, subtitle, icon, btnText, content }) =>{
    let navigate = useNavigate();
    return(
        <div className='w-6/12 mx-auto my-10  white-glassmorphism pb-3 hover:shadow-xl'>
                <div className='flex flex-1 justify-center items-center flex-col md:mr-10'>
                    <div className={`w-32 h-32 rounded-full flex justify-center items-center bg-[#2952E3] my-10`}>
                        {icon}
                    </div>
                    <h1 className='text-3xl sm:text-5xl text-white py-1'>{title}</h1>
                    <p className='text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        {subtitle}
                    </p>
                    <div className='w-5/6'>
                        {content || null}   
                    </div>
                    <button
                        type='button'
                        onClick={() => navigate('/')}
                        className='text-white w-4/6 mt-5 border-[1px] p-2 border-[#3d4f7c] rounded-full 
                            cursor-pointer hover:bg-[#2952e3] '>
                            <p className='text-white text-base font-semibold'>{btnText || "Retry Again"}
                        </p>
                    </button>
                </div>
        </div>
    )
}

export default InfoCard