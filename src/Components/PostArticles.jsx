import React from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';

const PostArticles = () => {


    const { user } = useAuth();
    console.log(user);


    const handlePostSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        data.tags = data.tags.split(',').map(tag=>tag.trim());
        console.log(data);

        // save post to the db
        axios.post('http://localhost:3000/articles',data)
        .then(res=>{
            console.log(res);
        })
        .catch(error=>{
            console.log(error);
        });

    };

    return (
        <div className=''>
            <h3 className="text-4xl text-center my-6">Post Your Article</h3>
            <form className='mb-10' onSubmit={handlePostSubmit}>
                <fieldset className="fieldset mx-auto bg-base-200 border-base-300 rounded-box w-xl border p-4">

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
                    <input type="text" name='thumbnailURL' className="input w-full" placeholder="Thumbnain URL" />
                    {/* Date */}
                    <label className="label">Post Date</label>
                    <input type="date" className="input w-full" name='date' />                    
                    {/* Author Email */}
                    <label className="label">Author's Email</label>
                    <input type="text" name='email' className="input w-full" placeholder="Email" defaultValue={user.email} />
                    {/* Author Username */}
                    <label className="label">Author's Username</label>
                    <input type="text" name='username' className="input w-full" placeholder="Username" defaultValue={user.displayName} />

                    <button type='submit' className='btn btn-primary mt-4'>Submit</button>
                </fieldset>
            </form>
        </div>
    );
};

export default PostArticles;
