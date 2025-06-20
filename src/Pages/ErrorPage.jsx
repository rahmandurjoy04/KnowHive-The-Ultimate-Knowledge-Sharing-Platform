import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router';
import errLottie from '../assets/Lotties/err.json'

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center py-10 bg-[#36dae9]' >
            <Lottie style={{ width: "500px" }} animationData={errLottie} loop={true}></Lottie>
            <Link className='pt-5' to={'/'}>
                <button className='btn btn-lg btn-error'>Back To Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;