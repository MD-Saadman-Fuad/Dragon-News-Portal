import React from 'react';
import error from '../assets/error.png';
import Navbar from '../components/Navbar';

const Error = () => {
    return (
        <div className='mt-2 max-w-7xl mx-auto'>
            <Navbar></Navbar>   
            <img className="mt-2 rounded-2xl mx-auto w-200" src={error} alt="Error" />
        </div>
    );
};

export default Error;