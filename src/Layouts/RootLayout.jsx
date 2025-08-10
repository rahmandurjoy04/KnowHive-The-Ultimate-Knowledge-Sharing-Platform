import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '../Components/ScrollToTop';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />

        </div>
    );
};

export default RootLayout;