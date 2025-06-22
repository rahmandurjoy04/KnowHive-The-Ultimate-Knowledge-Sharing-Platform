import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { motion } from "framer-motion";
import axios from 'axios';
const AllallArticles = () => {

    const { allArticlesLoading, allArticles, categories } = useAuth();

    const [selectedCategory, setSelectedCategory] = useState('Select A Category')

    const [articles, setAllArticles] = useState([]);

    useEffect(() => {
        if (selectedCategory === 'All Categories' || selectedCategory === 'Select A Category') {
            setAllArticles(allArticles);
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

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
    };




    if (allArticlesLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <div className='flex justify-center mt-4'>

                <select
                    value={selectedCategory}
                    onChange={handleChange}
                    className="select text-center font-semibold">
                    <option disabled={true} defaultValue={'Select A Category'}>
                        Select A Category
                    </option>
                    <option value={'All Categories'}>All Categories</option>

                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {
                                category
                            }
                            
                        </option>
                    ))}
                </select>
            </div>
            {
                articles?.length !== 0 ?
                    (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
                            {Array.isArray(articles) &&
                                articles.map(article =>
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
                                                {
                                console.log(article)
                            }
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