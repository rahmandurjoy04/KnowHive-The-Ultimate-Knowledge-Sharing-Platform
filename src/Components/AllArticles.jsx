import React from 'react';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { motion } from "framer-motion";
const AllallArticles = () => {

    const { allArticlesLoading, allArticles } = useAuth()


    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };


    if (allArticlesLoading) {
        return <Loading></Loading>
    }

    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
            {
                allArticles.map(article =>
                    <motion.div
                        key={article._id}
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="card bg-base-100 w-auto border shadow-sm">

                            <div className="card-body">
                                <h2 className="card-title text-2xl">{article.title}</h2>

                                <div className='flex justify-between'>
                                    <span className='text-sm font-semibold'>By {article.username}</span>
                                    <span className='text-sm font-semibold'>Date: {article.date}</span>
                                </div>
                                <Link to={`/articles/${article._id}`}>
                                    <button className='btn btn-primary w-full'>Read More</button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </div>
    );
};

export default AllallArticles;