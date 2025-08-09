import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Contributors = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://a-11-knowhive-srver.vercel.app/contributors')
            .then((res) => {
                setContributors(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching contributors:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center py-10">Loading contributors...</p>;
    if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;


    return (
        <div className='mx-auto max-w-11/12 min-w-sm'>
            <h1 className='text-center text-4xl font-bold my-5'>Contributors</h1>
            <div className="grid gap-6 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10">
                {contributors.map((contrib) => (
                    <div
                        key={contrib._id}
                        className="bg-base-100 rounded-lg shadow-xl  p-4 flex flex-col"
                    >
                        <div className='flex gap-2 justify-around'>
                            {/* Author Image */}
                            <div className='w-1/3'>
                                <img
                                    src={contrib.authorImage}
                                    alt={`${contrib.username}'s avatar`}
                                    className="w-24 h-24 rounded-full  mx-auto mb-4 object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className='flex flex-col justify-start w-2/3'>
                                {/* Name and Email */}
                                <h3 className="text-xl font-bold">{contrib.username}</h3>
                                <p className=" text-gray-600 truncate">{contrib.email}</p>

                                {/* Number of Posts */}
                                <p className=" font-medium mb-4">
                                    Posts: <span className="text-indigo-600">{contrib.postCount}</span>
                                </p>
                            </div>
                        </div>

                        {/* Last Posted Article */}
                        {contrib.lastArticle ? (
                            <div className="mt-3">
                                <div className='ml-2'>
                                    <h4 className="font-semibold">Latest Article:</h4>
                                    <a
                                        href={`/articles/${contrib.lastArticle._id}`}
                                        className="block text-primary hover:underline truncate"
                                        title={contrib.lastArticle.title}
                                    >
                                        {contrib.lastArticle.title}
                                    </a>
                                    <p className="text-sm text-gray-500">Posted on: {new Date(contrib.lastArticle.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {contrib.lastArticle.thumbnailURL && (
                                    <img
                                        src={contrib.lastArticle.thumbnailURL}
                                        alt={contrib.lastArticle.title}
                                        className="mt-2 rounded-md w-full object-cover h-32"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 mt-auto">No articles yet</p>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Contributors;