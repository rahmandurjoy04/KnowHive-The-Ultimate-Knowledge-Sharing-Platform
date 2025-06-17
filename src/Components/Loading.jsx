import Lottie from 'lottie-react';
import React from 'react';
import loading from '../assets/Lotties/loading.json'

const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
                    <Lottie style={{ width: "500px" }} animationData={loading} loop={true}></Lottie>
            
        </div>
    );
};

export default Loading;