import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { Link } from 'react-router';

const AllArticles = () => {
    const [articles, setArticles] = useState(null);
    const [articlesLoading, setArticlesLoading] = useState(true);

    

    useEffect(() => {
        axios.get('http://localhost:3000/articles')
            .then(res => {
                setArticlesLoading(false);
                setArticles(res.data);

            })
            .catch(err => console.error(err));
    }, []);

    if (articlesLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
                {
                    articles.map(article => <div key={article._id} className="card bg-base-100 w-auto border shadow-sm">
                        
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
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllArticles;