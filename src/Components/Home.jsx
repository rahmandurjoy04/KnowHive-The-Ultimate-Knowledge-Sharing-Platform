import React from 'react';
import Banner from './Banner';
import RecentArticles from './RecentArticles';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <h1 className='text-xl sm:text-2xl md:text-4xl text-center mt-6'>Recent Articles</h1>
            <RecentArticles></RecentArticles>
        </div>
    );
};

export default Home;