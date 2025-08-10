import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router';
import errLottie from '../assets/Lotties/err.json'

const ErrorPage = () => {
    return (
        <div className='flex flex-col h-[100vh] justify-center items-center py-10 bg-[#36dae9]' >
            <Lottie style={{ width: "500px" }} animationData={errLottie} loop={true}></Lottie>
            <p className='text-3xl text-red-600'>The Page You're looking for in Not Found</p>
            <Link className='pt-5' to={'/'}>
                <button className='btn btn-lg btn-primary'>Back To Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;