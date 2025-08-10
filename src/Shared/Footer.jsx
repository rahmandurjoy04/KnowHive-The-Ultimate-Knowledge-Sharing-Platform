import React from 'react';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { Link } from 'react-router';
import light from "../assets/knowhive-banner.png"
import Logo from '../Components/Logo';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white min-w-sm  py-10">
            <div className=" mx-auto max-w-11/12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Description */}
                <div>
                    
                    <Logo/>
                    <p className="text-sm">A buzzing community of learners exchanging wisdom</p>
                    <div className='my-3 text-md'>
                        <p className='flex items-center gap-2 mt-2'><MdMailOutline className='text-lg'></MdMailOutline> <a href="mailto:nainurrahman70@gmail.com" className='className="link hover:text-blue-500 hover:underline">'>nainurrahman70@gmail.com</a></p>

                    </div>
                </div>

                {/* Important Links */}
                <div className='md:mx-auto'>
                    <h3 className="font-semibold text-lg mb-3">Important Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/allArticles" className="link link-hover">Articles</a></li>
                        <li><a href="/about" className="link link-hover">About Us</a></li>
                        <li><a href="/contributors" className="link link-hover">Contributors</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className='md:mx-auto'>
                    <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-2xl">
                        <a href="https://www.facebook.com/durjoy4004/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaFacebook />
                        </a>
                        <a href="https://github.com/rahmandurjoy04" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/durjoy4004/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>


            </div>

            <div className="text-center mt-10 text-sm opacity-70">
                © {new Date().getFullYear()} <span className='font-extrabold'>KnowHive</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;