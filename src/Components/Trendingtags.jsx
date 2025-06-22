import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const Trendingtags = () => {
    const [trendings, setTrendings] = useState(null);
    const [trendingLoading, setTrendingLoading] = useState(true);

    useEffect(() => {
        axios.get('https://a-11-knowhive-srver.vercel.app/trending-tags')
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
        <div className='min-w-sm mx-auto'>
            <h1 className='text-xl md:text-4xl font-bold text-center my-5'>Trending Tags</h1>
            <div className="flex flex-col md:flex-row justify-around border rounded-xl shadow mx-4 md:mx-3 mb-7 divide-y md:divide-y-0 divide-gray-300">

                {
                    trendings.map(trending => 
                    <div key={trending._id} className="text-center py-3">
                        <div className="text-lg text-error">{trending._id}</div>
                        <div className="text-accent text-5xl py-3 font-bold">{trending.count}</div>
                        <div className="">Times Till {day} {month} {year}</div>
                    </div>
                    )
                }

            </div>
        </div>
    );
};

export default Trendingtags;