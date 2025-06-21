import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import Loading from '../Components/Loading';

const CategoryArticles = () => {
    const { categoryName } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://a-11-knowhive-srver.vercel.app/articles/category/${categoryName}`)
            .then(res => {
                setArticles(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [categoryName]);

    if (loading) return <Loading></Loading>;
    if (articles.length === 0) {
        return (
            <div>
                <h2 className="text-3xl font-semibold mb-4  text-center mt-5">{decodeURIComponent(categoryName)} Articles</h2>
                <h1 className='text-xl sm:text-2xl md:text-4xl font-bold py-20 mx-6  bg-amber-200 text-red-700 rounded-xl text-center'>No Articles Yet</h1>
                <Link to={'/postArticles'} className='flex justify-center my-6'>
                    <button className='btn btn-primary'>Add Article</button>
                </Link>
            </div>

        )
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4  text-center mt-5">{decodeURIComponent(categoryName)} Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-8">
                {articles.map(article => (
                    <div key={article._id} className="card bg-base-100 shadow border">
                        <img src={article.thumbnailURL} className="h-[200px] w-full rounded-t-lg object-fit" alt="" />
                        <div className="card-body">
                            <h2 className="card-title text-3xl">{article.title}</h2>
                            <p className='bg-gray-100 rounded-xl py-3 px-2 dark:text-black'>{article.content}</p>
                            <div className='flex justify-between mt-3'>
                                <span className='text-sm font-semibold'>By {article.username}</span>
                                <span className='text-sm font-semibold'>Date: {article.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryArticles;
