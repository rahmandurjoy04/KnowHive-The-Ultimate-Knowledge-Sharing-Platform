import React from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostArticles = () => {


    const { user, allArticles, setAllArticles, categories } = useAuth();

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        data.tags = data.tags.split(',').map(tag => tag.trim());
        data.author_id = user.uid;
        data.createdAt = new Date();
        data.authorImage = user.photoURL;
        data.likes = 0;


        // save post to the db
        axios.post('https://a-11-knowhive-srver.vercel.app/articles', data)
            .then(res => {
                const result = res.data;
                if (result.acknowledged && result.insertedId) {
                    toast.success('Article Posted Successfully.');
                    const newAllArticles = [...allArticles, data]
                    setAllArticles(newAllArticles);
                    form.reset();
                }
            })
            .catch(error => {
                console.log(error);
                toast.error('Something went wrong while posting.')
            });

    };

    return (
        <div className='relative'>
            <h3 className="text-xl sm:text-2xl md:text-4xl text-center my-6">Post Your Article</h3>
            <div className='flex'>
                <aside className="hidden w-1/3 sticky top-16 z-1 lg:block h-full ml-15 p-9 bg-gradient-to-br from-blue-50 to-white border-l border-blue-200 rounded-xl shadow-lg">
                    <h3 className="text-xl font-extrabold mb-5 text-blue-700">💡 Writing Suggestions</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <span className="text-blue-500 text-2xl">📚</span>
                            <span className="text-gray-800 font-medium">
                                Include at least <span className="font-bold text-blue-600">3 credible sources</span> for your claims.
                            </span>
                        </li>

                        <li className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <span className="text-green-500 text-2xl">✂️</span>
                            <span className="text-gray-800 font-medium">
                                Use short paragraphs (<span className="font-bold text-green-600">3–4 sentences</span>) to improve readability.
                            </span>
                        </li>

                        <li className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <span className="text-purple-500 text-2xl">📊</span>
                            <span className="text-gray-800 font-medium">
                                Incorporate <span className="font-bold text-purple-600">relevant statistics</span> to support arguments.
                            </span>
                        </li>

                        <li className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <span className="text-pink-500 text-2xl">🔍</span>
                            <span className="text-gray-800 font-medium">
                                Check for keyword density (<span className="font-bold text-pink-600">~1–2% of total words</span>).
                            </span>
                        </li>

                        <li className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <span className="text-yellow-500 text-2xl">⚡</span>
                            <span className="text-gray-800 font-medium">
                                Use active voice in at least <span className="font-bold text-yellow-600">80% of your sentences</span>.
                            </span>
                        </li>
                    </ul>
                </aside>
                <form className=' mb-5 w-2/3' onSubmit={handlePostSubmit}>
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
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {
                                        category
                                    }

                                </option>
                            ))}
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
                        <input type="text" name='username' className="input w-full" placeholder="Username" value={user?.displayName || ""} readOnly />

                        <button type='submit' className='btn btn-primary mt-4'>Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default PostArticles;
