import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import Loading from './Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { motion } from 'framer-motion';


const MyArticles = () => {
    const { user, setAllArticles, allArticles } = useAuth();
    const [myArticles, setMyArticles] = useState(null);
    const [myArticlesLoading, setMyArticlesLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/myArticles?email=${user.email}`)
            .then(res => {
                setMyArticlesLoading(false);
                setMyArticles(res.data);
            })
            .catch(err => console.error(err));

    }, [user.email]);


    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Start deleting the Article
                fetch(`http://localhost:3000/articles/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const filterdeMyArticles = myArticles.filter(article => article._id !== id);
                            const filterdeAllArticles = allArticles.filter(article => article._id !== id);
                            setMyArticles(filterdeMyArticles);
                            setAllArticles(filterdeAllArticles);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Article has been deleted.",
                                icon: "success"
                            });
                        }
                    })



            }
        });
    }

    if (myArticlesLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto">
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Post Title</th>
                            <th>Post Category</th>
                            <th>Posted On</th>
                            <th className='flex justify-center'>Operations</th>
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
                                    <td className='flex justify-center'>
                                        <div className="join">
                                            <Link to={`/updateArticle/${myArticle._id}`}>
                                                <button className="btn btn-sm btn-accent join-item">Update</button>
                                            </Link>
                                            <button onClick={() => handleDelete(myArticle._id)} className="btn btn-sm btn-error join-item">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </motion.section>
        </div>
    );
};

export default MyArticles;