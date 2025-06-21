import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateArticle = () => {
    const { user, allArticles, setAllArticles } = useAuth();
    const { title, content, category, thumbnailURL, date, tags, _id } = useLoaderData();
    const tagsArray = tags.map(tag => tag.trim()).filter(tag => tag);


    const handleUpdateArticle = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        data.tags = data.tags.split(',').map(tag => tag.trim());
        data.author_id = user.uid;
        data.authorImage = user.photoURL;
        console.log(data);

        // Sending update
        const response = await axios.patch(`http://localhost:3000/articles/${_id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const res = response.data;
        if (res.modifiedCount) {
            // Update allArticles by replacing the old article
            const updatedArticles = allArticles.map(article =>
                article._id === _id ? { ...article, ...data, tags: data.tags } : article
            );
            setAllArticles(updatedArticles);
            
            Swal.fire({
                icon: "success",
                title: "Your Article has been Updated.",
                showConfirmButton: false,
                timer: 1500
            });


        }


    }
    return (
        <div>
            <h3 className="text-xl sm:text-2xl md:text-4xl text-center my-6">Update Your Article</h3>
            <form className='mb-10' onSubmit={handleUpdateArticle}>
                <fieldset className="fieldset mx-auto bg-base-200 border-base-300 rounded-box max-w-xl min-w-sm border p-4">

                    {/* Title */}
                    <label className="label">Post Title</label>
                    <input type="text" name='title' className="input w-full" placeholder="Post Title" defaultValue={title} />

                    {/* Content */}
                    <label className="label">Post Content</label>
                    <textarea className="textarea w-full" name='content' placeholder="Post Content" defaultValue={content}></textarea>

                    {/* Category */}
                    <label className="label">Post Category</label>
                    <select defaultValue={category} name='category' className="select w-full" >
                        <option disabled={true}>Select Post Category</option>
                        <option>Science & Technology</option>
                        <option>History & Culture</option>
                        <option>Curious Facts</option>
                        <option>Daily Discoveries</option>
                        <option>Explainers (How It Works)</option>
                    </select>

                    {/* Tags */}
                    <label className="label">Post Tags</label>
                    <textarea className="textarea w-full" name='tags' placeholder="Post Tags (Comma Separated)" defaultValue={tagsArray}></textarea>

                    {/* Thumbnail URL */}
                    <label className="label">Thumbnail URL</label>
                    <input type="text" name='thumbnailURL' className="input w-full" placeholder="Thumbnail URL" defaultValue={thumbnailURL} />
                    {/* Date */}
                    <label className="label">Post Date</label>
                    <input type="date" className="input w-full" name='date' defaultValue={date} />
                    {/* Author Email */}
                    <label className="label">Author's Email</label>
                    <input type="text" name='email' className="input w-full" placeholder="Email" value={user?.email || ""} readOnly />
                    {/* Author Username */}
                    <label className="label">Author's Username</label>
                    <input type="text" name='username' className="input w-full" placeholder="Username" value={user?.displayName || ""} readOnly />

                    <button type='submit' className='btn btn-primary mt-4'>Update Article</button>
                </fieldset>
            </form>
        </div>
    );
};

export default UpdateArticle;