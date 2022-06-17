import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { Loader } from '../components';
import { durations } from '../utils/data';


const Input  = ({ placeholder,name, type, value, handleChange}) => (
    <input 
        placeholder={placeholder}
        type={type}
        step="1"
        min="1"
        max="60"
        name={name}
        value={value}
        onChange={handleChange}
        className='out-of-range:border-red-500 my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism'
    />
);



const Welcome = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isLoggedIn,setIsLoggedIn ] = useState(false);
    const [ formData, setFormData ] =  useState({ name: '', word: '', duration: '', custom: null, generateType: 'system'})
    const [ errors, setErrors ] = useState([]);
    let navigate = useNavigate();

    const handleSubmit = () => {

        const { name, word, duration ,custom, generateType} = formData;
        // little validation @todo: Display error message
        if( generateType === 'manual' && word.length < 5 ){
            return;
        }

        if( !name || !duration ) {
            return;
        }

        let pattern = /^[0-9 ]+$/
        if( duration === 'custom' && custom === null ){
            if(  pattern.test( custom ) === false ){
                return;
            }
        }
        
        if( errors.length > 0 ) return;
        navigate('/challenge', { state: formData });
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name] : e.target.value}))
    }

    const Duration = ({item}) => {
        const { duration } = formData
        const { id, title } = item
        return (
            <button type="button" onClick={() => setFormData(( prevState) => ({...prevState, duration: id}))}
                className={`${duration === id ? 'bg-[#2952e3]': null} text-white w-auto mt-2 border-[1px] p-2 mr-2 border-[#3d4f7c] rounded-md cursor-pointer`}>
                    {title}
            </button>
        )
    }

    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start flex-col md:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                        TypeFast <br /> be the best you can.
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        TypeFast is a simple tool, where you can conveniently brush up your typing skills.
                    </p>
                    { !isLoggedIn && (
                        <button
                            type='button'
                            onClick={() => console.log('Create Account')}
                            className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2952e3]'>
                                <p className='text-white text-base font-semibold'>Create An Account</p>
                        </button>
                    )}
                </div>
                <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-4 '>
                    
                    <div className='p-5 sm:w-96 w-full flex-col justify-start items-center blue-glassmorphism'>
                        
                        <Input placeholder="Set a Name" name="name" type="text" handleChange={handleChange} />
                        <div className='flex flex-row'>
                            <div className='text-white  flex-1'>
                                <label>
                                    <input 
                                        type="radio" 
                                        name='generateType' 
                                        checked={formData.generateType === 'system'}
                                        onChange={handleChange}
                                        value='system' 
                                        className="checked:bg-blue-500 mr-2 pr-4" />
                                    Generate
                                </label>
                            </div>
                            <div className='text-white flex-1'>
                                <label>
                                    <input 
                                        type="radio" 
                                        name='generateType' 
                                        checked={formData.generateType === 'manual'}
                                        onChange={handleChange}
                                        value='manual' 
                                        className="checked:bg-blue-500 mr-2" />
                                    Paste Text
                                </label>
                            </div>
                        </div>
                        {formData.generateType === 'manual' && (
                            <Input placeholder="Enter Message" name="word" type="text" handleChange={handleChange} />
                        )}
                        <p className='ml-0 mt-1'><span className='text-white opacity-40'>Set duration</span></p>

                        {durations.map(( item, index) => <Duration key={index} item={item} />)}
                        
                        {formData.duration === 'custom' && <Input placeholder="Set a custom time (in minute)" name="custom" type="number" handleChange={handleChange}/>}

                        <div className='h-[1px] w-full bg-gray-400 my-2 ' />
                        {errors.length > 0 && (
                            <div className='w-full bg-red-500 p-2 mt-2'>
                                {errors.map( (item, index) => (
                                    <h5 className='text-white p-1' key={index}>* {item}</h5>
                                ))}
                            </div>
                        )}
                        { isLoading ? (
                            <Loader />
                        ): (
                            <button
                                type='button'
                                onClick={handleSubmit}
                                className='text-white w-full mt-2 border-[1px] border-[#3d4f7c] rounded-full bg-[#2952e3] p-3 hover:bg-[#2546bf] cursor-pointer'>
                                    <p className='text-white text-base font-semibold'>Start Typing</p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;