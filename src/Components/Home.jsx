import React from 'react';
import Banner from './Banner';
import RecentArticles from './RecentArticles';
import CategoriesList from './CategoriesList';
import TopContributors from './TopContributors';
import Trendingtags from './Trendingtags';
import Newsletter from './Newsletter';

const Home = () => {
    return (
            <div className='w-11/12 mx-auto'>
                <Banner></Banner>
                <RecentArticles></RecentArticles>
                <CategoriesList></CategoriesList>
                <TopContributors></TopContributors>
                <Trendingtags></Trendingtags>
                <Newsletter></Newsletter>
            </div>
    );
};

export default Home;