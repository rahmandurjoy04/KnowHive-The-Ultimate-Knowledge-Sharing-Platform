import React, { use } from 'react';
import Lottie from 'lottie-react';
import loginLottie from '../assets/Lotties/Login.json'
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const Login = () => {

    // Using the context
    const { loginUser } = use(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // User Login With Email and Pass
        loginUser(email, password)
            .then(res => {
                console.log(res.user);
                toast.success('User Login Successful.')
            })
            .catch(error => {
                console.log(error)
                toast.error('Something went Wrong!')
            });

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie className='w-auto md:w-[700px]' animationData={loginLottie} loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-center">Login now!</h1>

                        <button className="btn mt-5 bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                          <div className="divider">X</div>


                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input w-full" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input w-full" placeholder="Password" />
                                <button type='submit' className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                        <Link className='text-center' to={'/register'}>Don't have an Account? <span className='text-blue-500'>Register</span> Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;