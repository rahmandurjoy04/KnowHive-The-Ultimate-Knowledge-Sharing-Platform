import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
const RecentArticles = () => {
    const [recentArticles, setRecentArticles] = useState(null);
    const [recentLoading, setRecentLoading] = useState(true);


    useEffect(() => {
        axios.get('https://a-11-knowhive-srver.vercel.app/recentArticles')
            .then(res => {
                setRecentLoading(false);
                setRecentArticles(res.data);

            })
            .catch(err => console.error(err));
    }, []);




    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    if (recentLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='min-w-sm'>
            <h1 className='text-xl sm:text-2xl md:text-4xl font-bold text-center my-5'>Recent Articles</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    recentArticles.map(article =>
                        <motion.div
                            key={article._id}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            <div className="card bg-base-100 w-auto border-white border  h-full shadow-md">
                                <figure>
                                    <img className='h-[250px] w-full'
                                        src={article.thumbnailURL}
                                        alt="Thumbnail" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-xl">{article.title}</h2>
                                    <p className='rounded-lg  w-full h-auto'>
                                        {
                                            article.content.length > 65
                                                ? <>
                                                    {article.content.slice(0, 65)}{"..."}

                                                </>
                                                : article.content
                                        }
                                    </p>
                                    <div className='flex justify-between items-center'>
                                        <Link
                                            to={`/articles/${article._id}`}
                                            className=" btn-primary text-white btn"
                                        >
                                            See More
                                        </Link>
                                        <span className='text-sm font-semibold'>{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </div>
        </div>

    );
};

export default RecentArticles;