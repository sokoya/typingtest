import React from 'react'

import { BiTime} from 'react-icons/bi';

const TimingCard = ({ name, duration }) =>{
    return(
        <div className="flex flex-row justify-start item-center white-glassmorphism p-3 m-2 hover:shadow-xl">
            <div className={`w-10 h-10 rounded-full flex justify-center items-center bg-[#2952E3]`}>
                <BiTime fontSize={21} className='text-white' />
            </div>
            <div className='ml-5 flex flex-1 justify-between align-middle'>
                <h3 className='mt-2 text-white text-lg'>{name}</h3>
                <p className='mt-2 text-white text-4xl'>{duration} Sec</p>
            </div>
        </div>
    )
}

export default TimingCard