import React, { use } from 'react';
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';

const CategoriesList = () => {

    const {categories} = useAuth()

    return (
        <div className='min-w-sm'>
            <h1 className="text-4xl text-center font-bold mt-6">Article Categories</h1>
            <div className="flex flex-col md:flex-row justify-center gap-8 p-4">
                {categories.map(category => (
                    <Link
                        key={category}
                        to={`/category/${encodeURIComponent(category)}`}
                        className="btn btn-outline btn-primary btn-sm"
                    >
                        {category}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesList;