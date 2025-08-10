import React from 'react';
import light from "../assets/knowhive-banner.png"
import { Link } from 'react-router';


const Logo = () => {
    return (
        <div className='flex justify-start items-center'>
            <img src={light} alt="Light"
                className='w-10 h-10'
            />
            <Link to={'/'}>
                <h1 className='text-2xl'><span className='font-extrabold'>Know</span>Hive</h1>
            </Link>
        </div>
    );
};

export default Logo;