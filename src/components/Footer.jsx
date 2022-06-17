const Footer = () => {
    const commonClass = 'text-white text-sm text-center'
    return (
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
            <div className='flex justify-center items-center flex-col mt-5'>
                <p className={`${commonClass}`}>TypeFast is a simple tool, where you can conveniently brush up your typing skills.</p>
                <p className={`${commonClass}`}>Come Join Us</p>
                <p className={`${commonClass}`}>hello@typefast.io</p>
            </div>
            <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5' />

            <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
                <p className={`${commonClass}`}><a href='#' target='_blank' rel='noopener noreferr'>@typefast</a></p>
                <p className={`${commonClass}`}>All right reserved</p>
            </div>
        </div>
    );
}

export default Footer;