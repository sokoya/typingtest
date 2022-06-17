import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BiTimer,BiErrorCircle }  from 'react-icons/bi';
import { BsCheck2 }  from 'react-icons/bs';
import { ImCross }  from 'react-icons/im';

import { InfoCard, Loader, TimingCard} from '../components';
import { randomWords, } from '../utils/data'
import { getWordCount } from '../utils/function';

const Challenge = () => {

    const [ isLoading, setIsLoading] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ challengeData, setChallengeData ] = useState();
    const [ result, setResult ] = useState({ totalCount: 0, valid: 0})
    const [ completed, setCompleted ] = useState(false);
    const [ elapsed, setElapsed] = useState( false );


    let navigate = useNavigate();
    const {state} = useLocation();

    useMemo(() => {
        (async function() {
            let { name, word, duration, generateType, custom} = state;
            if( generateType === 'system' ){
                const index = Math.floor(Math.random() * randomWords.length)
                word = randomWords[index];
            }
            // custom time by user
            if( custom !== null ){ duration = custom; }
            duration = duration * 60;
            const wordCount =  getWordCount(word);
            setResult((prev) => ({...prev, totalCount: wordCount}));
            setChallengeData({ word, name, duration})
        })();
    }, [])

    let counter;
	useEffect(() => {
        const { duration } = challengeData;
        if( duration < 1 ) setElapsed(true)
        if( duration ){
            counter = duration > 0 && setInterval(() => {
                setChallengeData((prev) => ({...prev, duration: duration-1}))
            }, 1000);
            return () => clearInterval(counter);
        }
	}, [challengeData?.duration]);
    


    const handleChange = e => {
        let response = e.target.value;
        setMessage(response);
        const { word } = challengeData;
        var generatedPart= word.split(' ');
        var userResponsePart= response.split(' ');

        let valid = 0;

        for(let i = 0; i < generatedPart.length; i++){
            if(generatedPart[i] === userResponsePart[i])
                valid++; 
        }
        setResult(( prev) => ({...prev, valid}))
    }
    
    
    const handleSubmit = () => {
        if( !message) return;
        clearInterval(counter);
        setTimeout(() => {
            setIsLoading(true)    
        }, 1000);
        setIsLoading(false)
        setCompleted(true);
    }

    // timeElapsed before user completed typing
    if( elapsed ){
        return (
            <InfoCard
                icon={<BiTimer fontSize={40} className='text-white' />}
                title="Time Up"
                subtitle="You did not complete the typing skill before countdown"
            />
        )
    }

    // onError
    if( !challengeData?.word ){
        return(
            <InfoCard
                icon={<BiErrorCircle fontSize={40} className='text-white' />}
                title="Please hold on"
                content={<Loader />}
                subtitle="Checking...."
                btnText="Something went wrong, retry."
            />
        )
    }

    // User submitted, show user the result
    if( completed ){
        const { valid, totalCount} = result;
        return (
            <InfoCard
                icon={<BsCheck2 fontSize={40} className='text-white' />}
                title="Great!"
                subtitle="See how you did below."
                content={
                    <>
                        <div className="flex flex-row justify-between item-center white-glassmorphism p-3 m-2">
                            <div className="flex flex-row justify-center items-center">
                                <div className={`w-10 h-10 rounded-full flex justify-center items-center `}>
                                    <BsCheck2 fontSize={20} className='text-white' />
                                </div>
                                <h4 className='text-blue-300'>Word Count</h4>
                            </div>
                            <h3 className='mt-2 text-white text-lg'>{totalCount}</h3>
                        </div>
                        <div className="flex flex-row justify-between item-center white-glassmorphism p-3 m-2">
                            <div className="flex flex-row justify-center items-center">
                                <div className={`w-10 h-10 rounded-full flex justify-center items-center `}>
                                    <BsCheck2 fontSize={20} className='text-white' />
                                </div>
                                <h4 className='text-green-300'>Valid Point</h4>
                            </div>
                            <h3 className='mt-2 text-white text-lg'>{valid}</h3>
                        </div>
                        <div className="flex flex-row justify-between item-center white-glassmorphism p-3 m-2">
                            <div className="flex flex-row justify-center items-center">
                                <div className={`w-10 h-10 rounded-full flex justify-center items-center `}>
                                    <ImCross fontSize={20} className='text-white' />
                                </div>
                                <h4 className='text-red-300'>Invalid Point</h4>
                            </div>
                            <h3 className='mt-2 text-white text-lg'>{totalCount - valid}</h3>
                        </div>
                        
                    </>
                }
                btnText="Try Again."
            />
        )
    }
    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start flex-col md:mr-10'>
                    <TimingCard duration={challengeData?.duration} name={challengeData?.name} /> 
                    <div className='h-[1px] w-full bg-gray-400 my-2 ' />
                    <p className='mt-5 text-white font-light w-full text-base'>
                        {challengeData?.word}
                    </p>
                    <button
                            type='button'
                            onClick={() => navigate('/')}
                            className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full 
                                cursor-pointer hover:bg-[#2952e3] '>
                                <p className='text-white text-base font-semibold '>Reset Information
                            </p>
                        </button>
                </div>
                <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-4 '>
                    <div className='p-5 sm:w-96 w-full flex-col justify-start items-center blue-glassmorphism'>

                        <div className='w-full'>
                            <textarea 
                                className='placeholder:italic placeholder:text-slate-400 my-2 w-full 
                                rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism'
                                name='message' 
                                onChange={(e) => handleChange(e)}
                                rows={10}
                                value={message}
                                placeholder='Start typing...'></textarea>
                        </div>
                        
                        { isLoading ? (
                            <Loader />
                        ): (
                            <button
                                type='button'
                                disabled={message.length < 1}
                                onClick={handleSubmit}
                                className='text-white w-full mt-2 border-[1px] border-[#3d4f7c] rounded-full bg-[#2952e3] disabled:bg-slate-500 p-3 hover:bg-[#2546bf] cursor-pointer'>
                                    <p className='text-white text-base font-semibold'>Submit</p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Challenge;