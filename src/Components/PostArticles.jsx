import React from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostArticles = () => {


    const { user, allArticles,setAllArticles } = useAuth();

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        data.tags = data.tags.split(',').map(tag => tag.trim());
        data.author_id = user.uid;
        data.createdAt = new Date();
        data.authorImage = user.photoURL;


        // save post to the db
        axios.post('http://localhost:3000/articles', data)
            .then(res => {
                const result = res.data;
                if (result.acknowledged && result.insertedId) {
                    toast.success('Article Posted Successfully.');
                    const newAllArticles = [...allArticles,data]
                    setAllArticles(newAllArticles);
                }
            })
            .catch(error => {
                console.log(error);
                toast.error('Something went wrong while posting.')
            });

    };

    return (
        <div>
            <h3 className="text-xl sm:text-2xl md:text-4xl text-center my-6">Post Your Article</h3>
            <form className='mb-10' onSubmit={handlePostSubmit}>
                <fieldset className="fieldset mx-auto bg-base-200 border-base-300 rounded-box max-w-xl min-w-sm border p-4">

                    {/* Title */}
                    <label className="label">Post Title</label>
                    <input type="text" name='title' className="input w-full" placeholder="Post Title" />

                    {/* Content */}
                    <label className="label">Post Content</label>
                    <textarea className="textarea w-full" name='content' placeholder="Post Content"></textarea>

                    {/* Category */}
                    <label className="label">Post Category</label>
                    <select defaultValue="Select Post Category" name='category' className="select w-full">
                        <option disabled={true}>Select Post Category</option>
                        <option>Science & Technology</option>
                        <option>History & Culture</option>
                        <option>Curious Facts</option>
                        <option>Daily Discoveries</option>
                        <option>Explainers (How It Works)</option>
                    </select>

                    {/* Tags */}
                    <label className="label">Post Tags</label>
                    <textarea className="textarea w-full" name='tags' placeholder="Post Tags (Comma Separated)"></textarea>

                    {/* Thumbnail URL */}
                    <label className="label">Thumbnail URL</label>
                    <input type="text" name='thumbnailURL' className="input w-full" placeholder="Thumbnail URL" />
                    {/* Date */}
                    <label className="label">Post Date</label>
                    <input type="date" className="input w-full" name='date' />
                    {/* Author Email */}
                    <label className="label">Author's Email</label>
                    <input type="text" name='email' className="input w-full" placeholder="Email" value={user?.email || ""} readOnly />
                    {/* Author Username */}
                    <label className="label">Author's Username</label>
                    <input type="text" name='username' className="input w-full" placeholder="Username" value={user?.displayName || ""} readOnly/>

                    <button type='submit' className='btn btn-primary mt-4'>Submit</button>
                </fieldset>
            </form>
        </div>
    );
};

export default PostArticles;
