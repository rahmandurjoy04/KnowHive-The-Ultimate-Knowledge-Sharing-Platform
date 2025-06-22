import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loading from './Loading';

const TopContributors = () => {
    const [topContributors, setTopContributors] = useState(null);
    const [contributorsLoading, setContributorsLoading] = useState(true);
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    useEffect(() => {
        axios.get('https://a-11-knowhive-srver.vercel.app/top-contributors')
            .then(res => {
                setContributorsLoading(false)
                setTopContributors(res.data);
            })
    }, [])


    if (contributorsLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='min-w-sm'>
            <h1 className='text-xl md:text-4xl font-bold text-center mt-7'>Top Contributors</h1>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className='grid grid-cols-1 md:grid-cols-4 gap-5 px-4 my-5'
            >
                {
                    topContributors.map(contributor =>
                        <div key={contributor._id} className="card bg-base-100 w-auto border shadow-sm">
                            <figure>
                                <img className='h-[280px] object-cover w-full'
                                    src={contributor.authorImage}
                                    alt="Image" />
                            </figure>
                            <div className='border'></div>

                            <div className='px-3 py-2'>
                            <p className='text-sm'><span className='font-bold'>Contributor</span>: {contributor.username}</p>
                            <p className='text-sm'><span className='font-bold'>Number of Posts: </span>{contributor.count}</p>
                            </div>
                        </div>)
                }


            </motion.div>
        </div>
    );
};

export default TopContributors;