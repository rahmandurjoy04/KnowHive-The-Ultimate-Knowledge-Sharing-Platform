import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div
            className="hero h-[500px] min-w-sm"
            style={{
                backgroundImage:
                    "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md ">
                    <h1 className="mb-5 text-3xl font-bold">Share Your Knowledge</h1>
                    <p className="mb-5">
                        KnowHive is a buzzing hub where learners exchange wisdom, ideas, and insights. It fosters a collaborative community to grow, share knowledge, and innovate together.
                    </p>
                    <Link to={'allArticles'}>
                        <button className="btn btn-primary">Explore Articles</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;