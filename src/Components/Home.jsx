import React from 'react';
import Banner from './Banner';
import RecentArticles from './RecentArticles';
import CategoriesList from './CategoriesList';
import TopContributors from './TopContributors';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <h1 className='text-xl sm:text-2xl md:text-4xl font-bold text-center mt-6'>Recent Articles</h1>
            <RecentArticles></RecentArticles>
            <CategoriesList></CategoriesList>
            <TopContributors></TopContributors>
        </div>
    );
};

export default Home;