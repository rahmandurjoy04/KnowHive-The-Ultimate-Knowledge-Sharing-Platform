import React from 'react';
import Banner from './Banner';
import RecentArticles from './RecentArticles';
import CategoriesList from './CategoriesList';
import TopContributors from './TopContributors';
import Trendingtags from './Trendingtags';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <div  className='w-11/12 mx-auto'>
                <RecentArticles></RecentArticles>
                <CategoriesList></CategoriesList>
                <TopContributors></TopContributors>
                <Trendingtags></Trendingtags>
            </div>
        </div>
    );
};

export default Home;