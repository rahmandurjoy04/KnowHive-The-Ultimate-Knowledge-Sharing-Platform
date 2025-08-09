import React from 'react';
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';

const CategoriesList = () => {

    const {categories} = useAuth()

    return (
        <div className='min-w-sm'>
            <h1 className="text-4xl text-center font-bold my-5">Article Categories</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-center md:justify-between gap-8 md:p-0">
                {categories.map(category => (
                    <Link
                        key={category}
                        to={`/category/${encodeURIComponent(category)}`}
                        className="btn w-full btn-outline btn-primary"
                    >
                        {category}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesList;