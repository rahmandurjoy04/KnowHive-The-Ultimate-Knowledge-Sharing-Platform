import React from 'react';
import { Link } from 'react-router';

const CategoriesList = () => {

    const categories = [
        'Science & Technology',
        'History & Culture',
        'Curious Facts',
        'Daily Discoveries',
        'Explainers (How It Works)'
    ]
    return (
        <div className=''>
            <h1 className="text-4xl text-center font-bold mt-6">Article Categories</h1>
            <div className="flex justify-center gap-8 p-4">
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