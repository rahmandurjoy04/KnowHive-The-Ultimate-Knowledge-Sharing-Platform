import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { motion } from 'framer-motion';
const RecentArticles = () => {
    const [recentArticles, setRecentArticles] = useState(null);
    const [recentLoading, setRecentLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:3000/recentArticles')
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
                {
                    recentArticles.map(article =>
                        <motion.div
                            key={article._id}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            <div className="card bg-base-100 w-auto border shadow-sm">
                                <figure>
                                    <img className='h-[250px] w-full'
                                        src={article.thumbnailURL}
                                        alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{article.title}</h2>
                                    <p className='rounded-lg text-lg dark:text-black p-2 bg-gray-100 w-full h-auto'>
                                        {
                                            article.content.length > 100
                                                ? article.content.slice(0, 100) + '...'
                                                : article.content
                                        }
                                    </p>
                                    <div className='flex justify-between'>
                                        <span className='text-sm font-semibold'>By {article.username}</span>
                                        <span className='text-sm font-semibold'>Date: {article.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </div>
    );
};

export default RecentArticles;