import React from 'react';
import { Link } from 'react-router';
import bannerImg from '../assets/knowhive-banner.png';

const Banner = () => {
    return (
        <div className="flex min-h-[70vh] flex-col md:flex-row mt-10 min-w-sm  justify-center items-center rounded-xl gap-20 py-20 px-0 mx-auto md:px-10 bg-[#707f89]">

            <div className="w-full px-6 md:w-8/12 md:pl-20 flex flex-col justify-center items-center md:justify-start md:items-start  gap-10 text-white">
                <h1 className=" text-4xl font-bold text-center md:text-start">Share Your Knowledge</h1>
                <p className="text-lg text-center md:text-start w-full md:w-3/4">
                    KnowHive is a buzzing hub where learners exchange wisdom, ideas, and insights. It fosters a collaborative community to grow, share knowledge, and innovate together.
                </p>
                <Link to={'allArticles'}>
                    <button className="btn btn-primary">Explore Articles</button>
                </Link>
            </div>
            <div className="md:w-4/12 w-full">
                <img
                    src={bannerImg}
                    alt="Light"
                    style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))' }}
                    className='w-full h-full' />
            </div>

        </div>
    );
};

export default Banner;