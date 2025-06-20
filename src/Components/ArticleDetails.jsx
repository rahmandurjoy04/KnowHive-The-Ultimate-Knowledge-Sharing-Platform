import React, { Suspense } from 'react';
import { useLoaderData } from 'react-router';
import CommentInArticle from './CommentInArticle';


const ArticleDetails = () => {

    const { title, content, category, tags, username, thumbnailURL, date } = useLoaderData();
console.log(title);

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
            <div className='border border-gray-300'></div>
            <CommentInArticle></CommentInArticle>
        </div>

    );
};

export default ArticleDetails;