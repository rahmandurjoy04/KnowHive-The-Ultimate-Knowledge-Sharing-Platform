import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import Loading from '../Components/Loading';

const CategoryArticles = () => {
    const { categoryName } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/articles/category/${categoryName}`)
            .then(res => {
                setArticles(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [categoryName]);

    if (loading) return <Loading></Loading>;

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


                            <p className='text-xl font-bold'>Tags:</p>
                            <div className='grid grid-cols-3 gap-2'>
                                {
                                    article.tags.map((tag, index) => (
                                        <div key={index}>
                                            <button className="btn btn-info btn-outline w-full">{tag}</button>
                                        </div>
                                    )
                                    )
                                }
                            </div>
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
