import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import Loading from './Loading';

const MyArticles = () => {
    const { user } = useAuth();
    const [myArticles, setMyArticles] = useState(null);
    const [myArticlesLoading, setMyArticlesLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/idArticles?email=${user.email}`)
            .then(res => {
                setMyArticles(false);
                setMyArticles(res.data);
            })
            .catch(err => console.error(err));

    }, [user.email]);

    console.log(myArticles);



    useEffect(() => {
        axios.get('http://localhost:3000/articles')
            .then(res => {
                setMyArticlesLoading(false);
                setMyArticles(res.data);

            })
            .catch(err => console.error(err));
    }, []);

    if (myArticlesLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Post Title</th>
                        <th>Post Category</th>
                        <th>Posted On</th>
                        <th className='pl-9'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        myArticles.map((myArticle) =>
                            <tr key={myArticle._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={myArticle.thumbnailURL}
                                                    alt="Post Thumbnail" />
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {myArticle.title}
                                </td>
                                <td>{myArticle.category}</td>
                                <td>{myArticle.date}</td>
                                <td>
                                    <div className="join">
                                        <button className="btn btn-sm btn-accent join-item">Update</button>
                                        <button className="btn btn-sm btn-error join-item">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }

                </tbody>

            </table>
        </div>
    );
};

export default MyArticles;