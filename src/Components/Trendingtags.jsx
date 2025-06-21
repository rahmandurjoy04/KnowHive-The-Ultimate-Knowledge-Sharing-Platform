import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const Trendingtags = () => {
    const [trendings, setTrendings] = useState(null);
    const [trendingLoading, setTrendingLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/trending-tags')
            .then(res => {
                setTrendings(res.data);
                setTrendingLoading(false);
            })

            .catch(error => {
                console.log(error);
            })
    }, [])

    const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

    const now = new Date;
    const year = now.getFullYear()
    const month = monthNames[now.getMonth()]
    const day = now.getDate()

    if (trendingLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mx-4'>
            <h1 className='text-xl md:text-4xl font-bold text-center my-5'>Trending Tags</h1>
            <div className="stats border shadow w-full mb-7">

                {
                    trendings.map(trending => 
                    <div key={trending._id} className="stat place-items-center">
                        <div className="stat-title text-lg text-error">{trending._id}</div>
                        <div className="stat-value text-accent font-bold">{trending.count}</div>
                        <div className="stat-desc">Times Till {day} {month} {year}</div>
                    </div>
                    )
                }

            </div>
        </div>
    );
};

export default Trendingtags;