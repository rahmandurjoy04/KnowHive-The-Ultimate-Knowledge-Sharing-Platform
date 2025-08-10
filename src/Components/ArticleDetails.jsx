import React, { Suspense, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import CommentInArticle from './CommentInArticle';
import axios from 'axios';
import Loading from './Loading';
import useAuth from '../Hooks/useAuth';


const ArticleDetails = () => {

    const { categories } = useAuth()

    const { title, content, category, tags, username, thumbnailURL, date, _id, likes } = useLoaderData();

    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likesCount, setLikesCount] = useState(likes || 0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://a-11-knowhive-srver.vercel.app/comments/${_id}`)
            .then(res => {
                setComments(res.data);
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [_id]);



    if (loading) {
        return <Loading></Loading>
    }

    const commentsCount = comments.length;


    return (
        <div className="flex gap-6 bg-base-100 w-auto my-6 mx-auto min-w-xs max-w-11/12">
            <div className="card bg-base-100 md:w-3/4 w-full border shadow-sm">
                <figure>
                    <img className='h-[250px] w-full border-b-1'
                        src={thumbnailURL}
                        alt="Article URL" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">{title}</h2>
                    <p><span className='font-bold'>Category: </span><span className='text-[#36bae3] font-bold'>{category}</span></p>

                    <p className='rounded-lg text-lg w-full h-auto'>
                        {content}
                    </p>

                    <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Tags:</p>
                        <div className='flex flex-wrap items-center'>
                            {tags.map((tag, index) => (
                                <p
                                    key={index}
                                    className='border text-center rounded-lg px-1 my-1 mx-0.5 bg-[#176AE51A] text-[#176AE5]'
                                >
                                    {tag}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <span className='text-sm font-semibold'>By {username}</span>
                        <span className='text-sm font-semibold'>Date: {date}</span>
                    </div>

                </div>
                <div className='border'></div>
                <h1 className='text-2xl text-center pt-3'>Comments</h1>
                <div>
                    {
                        comments.length ?
                            comments.map(comment => <div key={comment._id} className="flex border-b flex-col max-w-lg p-6 space-y-3 overflow-hidden shadow-md bg-base-100 border my-4 mx-5 rounded-xl">
                                <div className="flex space-x-4">
                                    <img alt="" src={comment?.user_photo} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                    <div className="flex flex-col space-y-1">
                                        <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{comment.displayName}</a>
                                        <span className="text-xs">{comment.user_name}</span>
                                        <span className="text-xs">{comment.date}</span>
                                    </div>
                                </div>
                                <div className='rounded p-2 border'>{comment.comment}</div>

                            </div>)
                            : <>
                                <p className='text-center my-4'>No comments Yet</p>
                                <div className='border border-gray-300'></div>
                            </>

                    }
                </div>
                <div className='border'></div>

                <CommentInArticle likesCount={likesCount} setLikesCount={setLikesCount} commentsCount={commentsCount}></CommentInArticle>
            </div>
            <aside className="w-1/4 hidden md:flex flex-col p-4 border rounded-lg shadow-md h-full sticky top-18">
                <h3 className="text-3xl font-semibold mb-4 text-center">Categories</h3>
                <ul className="space-y-2 ">
                    <li className='border-y border-gray-300'>
                        <Link to={'/allArticles'}>
                            <button
                            className="w-full text-left p-2 hover:bg-blue-200"
                        >
                            All Categories
                        </button>
                        </Link>
                    </li>
                    {categories.map((cat, i) => (
                        <li key={i} className='border-b border-gray-300'>
                            <button
                            onClick={()=>navigate(`/category/${encodeURIComponent(cat)}`, { replace: true })}
                                className="w-full text-left p-2 rounded hover:bg-blue-200"
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>

    );
};

export default ArticleDetails;