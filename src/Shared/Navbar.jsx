import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from '../Components/ThemeToggle';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import Logo from '../Components/Logo';

const Navbar = () => {
    const { user, signOutUser, authLoading } = use(AuthContext);





    const handleLogOutBtn = () => {
        signOutUser()
            .then(() => {
                toast.success('User SignedOut Successfully.')
            })
            .catch(error => {
                console.log(error);
                toast.error('Something went wrong!')
            })
    }
    const links = <>
        <NavLink to={'/'}>Home</NavLink>
        {
            user && <>
                <NavLink to={'/allArticles'}>All Articles</NavLink>
                <NavLink to={'/myArticles'}>My Articles</NavLink>
                <NavLink to={'/postArticles'}>Post Articles</NavLink>
            </>
        }
        <NavLink to={'/contributors'}>Contributors</NavLink>
        <NavLink to={'/about'}>About Us</NavLink>

    </>
    return (
        <div className="navbar text-white min-w-sm sticky top-0 z-10 bg-secondary shadow-sm">
            <div className='w-11/12 mx-auto flex justify-between items-center'>
                <div className="flex">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu flex menu-sm dropdown-content bg-base-200 text-base-content rounded-box z-20 mt-3 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex space-x-4 justify-center items-center'>
                        <Logo/>
                        <ThemeToggle></ThemeToggle>
                    </div>
                </div>
                <div className=" hidden md:flex">
                    <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-4">
                        {
                            links
                        }
                    </ul>
                </div >
                <div className=" flex justify-end space-x-3">
                    {
                        authLoading ? (<span className="loading loading-dots loading-xl mr-4"></span>
                        ) : (<>
                            <div className='relative flex items-center group'>
                                {user && (
                                    <>
                                        <div className="flex gap-2">
                                            <div className="dropdown dropdown-end text-black">
                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-10 h-10 rounded-full">
                                                        <img
                                                            src={user?.photoURL}
                                                            alt="photo"
                                                            referrerPolicy="no-referrer"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="menu menu-sm dropdown-content bg-base-200 text-base-content rounded-box z-10 mt-3 w-52 p-2 shadow"
                                                >

                                                    <li><Link to={'/myArticles'} ><button className=''>My Articles</button></Link></li>
                                                    <li><Link to={'/postArticles'} ><button className=''>Post Articles</button></Link></li>
                                                    <li>
                                                        <button onClick={handleLogOutBtn} className=" ">LogOut</button>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </>
                                )}


                                {
                                    !user && <div>
                                        {
                                            (<>
                                                <Link to={'/login'} ><button className='btn btn-primary'>LogIn</button></Link>
                                            </>)
                                        }
                                    </div>
                                }

                            </div>




                        </>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;