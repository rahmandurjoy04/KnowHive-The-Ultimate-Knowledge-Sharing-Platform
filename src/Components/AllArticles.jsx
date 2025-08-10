import React, { Children, useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { motion } from "framer-motion";
import axios from 'axios';
const AllallArticles = () => {

    const { allArticlesLoading, allArticles, categories } = useAuth();

    const [selectedCategory, setSelectedCategory] = useState('Select A Category')

    const [articles, setAllArticles] = useState([]);

    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        if (selectedCategory === 'All Categories' || selectedCategory === 'Select A Category') {
            setAllArticles(Array.isArray(allArticles) ? allArticles : []);
        } else {
            axios
                .get(`https://a-11-knowhive-srver.vercel.app/articles/category/${encodeURIComponent(selectedCategory)}`)
                .then(res => setAllArticles(res.data))
                .catch(err => console.error(err));
        }
    }, [selectedCategory, allArticles]);



    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };


    // Sort articles client-side by date
    const sortedArticles = [...articles].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };


    if (allArticlesLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='min-w-sm my-5 mx-auto min-h-[70vh] max-w-11/12'>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
                <div>
                    <label className="mr-2 font-semibold text-gray-700" htmlFor="category-select">Filter by Category:</label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="select select-bordered w-48"
                    >
                        <option disabled>Select A Category</option>
                        <option value="All Categories">All Categories</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mr-2 font-semibold text-gray-700" htmlFor="sort-select">Sort by Date:</label>
                    <select
                        id="sort-select"
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="select select-bordered w-48"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>
            {
                sortedArticles?.length !== 0 ?
                    (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                            {Array.isArray(articles) &&
                                sortedArticles.map(article =>
                                    <motion.div
                                        key={article._id}
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeIn}
                                    >
                                        {
                                            console.log(article)
                                        }
                                        <div className="card bg-base-100  border min-w-xs max-w-sm mx-auto sm:max-w-lg h-full shadow-sm">

                                            <div className="card-body mx-auto p-3">
                                                <img src={article.thumbnailURL} className='w-full h-2/3 object-cover rounded-lg' alt="Thumbnail" />
                                                <h2 className="card-title text-xl">{article.title}</h2>
                                                <p className='rounded-lg text-lg  w-full h-auto'>
                                                    {
                                                        article.content.length > 65
                                                            ? <>
                                                                {article.content.slice(0, 65)}{"..."}

                                                            </>
                                                            : article.content
                                                    }
                                                </p>
                                                <div className='flex justify-between '>
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
                    )
                    : (<div className='flex flex-col justify-center items-center mx-4'>
                        <h1 className='text-center w-full text-xl md:text-4xl m-6 rounded-xl p-10 bg-info'>No Articles Yet</h1>
                        <Link to={'/postArticles'}>
                            <button className='btn btn-info mb-6'>Click to Add Article</button>
                        </Link>
                    </div>)
            }

        </div>
    );
};

export default AllallArticles;