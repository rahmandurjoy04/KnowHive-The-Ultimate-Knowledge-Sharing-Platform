import React, { Suspense, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import CommentInArticle from './CommentInArticle';
import axios from 'axios';
import Loading from './Loading';


const ArticleDetails = () => {

    const { title, content, category, tags, username, thumbnailURL, date, _id,likes} = useLoaderData();

    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likesCount, setLikesCount] = useState(likes || 0);


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
        <div className="card bg-base-100 w-auto border shadow-sm max-w-lg my-6 mx-auto min-w-xs">
            <figure>
                <img className='h-[250px] w-full border-b-1'
                    src={thumbnailURL}
                    alt="Article URL" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{title}</h2>
                <p><span className='font-bold'>Category: </span><span className='text-[#36bae3] font-bold'>{category}</span></p>

                <p className='rounded-lg text-lg dark:text-black p-2 bg-gray-100 w-full h-auto'>
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
                        comments.map(comment => <div key={comment._id} className="flex border-b flex-col max-w-lg p-6 space-y-6 overflow-hidden shadow-md bg-base-100 border my-4 mx-5 rounded-xl">
                            <div className="flex space-x-4">
                                <img alt="" src={comment?.user_photo} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                <div className="flex flex-col space-y-1">
                                    <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{comment.displayName}</a>
                                    <span className="text-xs">{comment.user_name}</span>
                                </div>
                            </div>
                            <div className='rounded p-3'>{comment.comment}</div>

                        </div>)
                        : <>
                            <p className='text-center my-4'>No comments Yet</p>
                            <div className='border border-gray-300'></div>
                        </>

                }
            </div>
            <div className='border'></div>

            <CommentInArticle likesCount = {likesCount} setLikesCount={setLikesCount} commentsCount={commentsCount}></CommentInArticle>
        </div>

    );
};

export default ArticleDetails;