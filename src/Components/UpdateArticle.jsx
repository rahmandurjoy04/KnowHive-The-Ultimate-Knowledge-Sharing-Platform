import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useLoaderData, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateArticle = () => {
    const { user, allArticles, setAllArticles, categories } = useAuth();
    const { title, content, category, thumbnailURL, date, tags, _id } = useLoaderData();
    const tagsArray = tags.map(tag => tag.trim()).filter(tag => tag);
    const navigate = useNavigate()


    const handleUpdateArticle = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        data.tags = data.tags.split(',').map(tag => tag.trim());
        data.author_id = user.uid;
        data.authorImage = user.photoURL;

        // Sending update
        const response = await axios.patch(`https://a-11-knowhive-srver.vercel.app/articles/${_id}`, data, {
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


    const handleCancel = () => {
        navigate("/myArticles"); // simply navigate back
    };
    return (
        <div className='py-10 relative'>
            <h3 className="text-xl sm:text-2xl md:text-4xl text-center mb-5">Update Your Article</h3>
            <div className='flex '>
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
                <form className='w-2/3' onSubmit={handleUpdateArticle}>
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

                        <div className="join join-horizontal w-full rounded-lg ">
                            <button type='submit' className="btn join-item w-1/2 bg-primary text-white">Update</button>
                            <button type="button" onClick={handleCancel} className="btn join-item w-1/2 bg-gray-500 text-white">Cancel</button>
                        </div>
                    </fieldset>
                </form>

            </div>
        </div>
    );
};

export default UpdateArticle;