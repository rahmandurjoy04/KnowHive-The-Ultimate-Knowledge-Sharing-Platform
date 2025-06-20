import React, { use, useState } from 'react';
import Lottie from 'lottie-react';
import registerLottie from '../assets/Lotties/Register.json'
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

const Register = () => {

    const [errorMessage, setErrorMessage] = useState('')
    // Using the context
    const { createUser, profileUpdate } = use(AuthContext)

    const navigate = useNavigate();
    

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photoUrl.value;
        const password = form.password.value;

        // Password Validation
        if (password.length < 6) {
            setErrorMessage('Password must be of atleast 6 characters.');
            return;
        }


        // Ragex Password check
        if (!/[a-z]/.test(password)) {
            setErrorMessage("Password must contain a small letter.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setErrorMessage("Password must contain a capital letter.");
            return;
        }
        if (!/\d/.test(password)) {
            setErrorMessage("Password must contain atleast one number.");
            return;
        }
        if (!/[$%^#@]/.test(password)) {
            setErrorMessage("Password must contain atleast one special character.");
            return;
        }

        createUser(email, password)
            .then(res => {
                console.log(res.user);
                profileUpdate(res.user, name, photo)
                    .then(() => {
                        toast.success('User Account Created Successfully.');
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error updating profile:', error);
                    });
            })
            .catch(error => {
                console.log(error)
                toast.error('Something went Wrong or You already have an Account!')
            });

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: "500px" }} animationData={registerLottie} loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Register now!</h1>

                        <form onSubmit={handleSignUp}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name='name' className="input w-full" placeholder="Name" />
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input w-full" placeholder="Email" />
                                <label className="label">Photo URL</label>
                                <input type="text" name='photoUrl' className="input w-full" placeholder="Photo URL" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input w-full" placeholder="Password" />
                                <p className='text-red-600 font-bold text-center'>{errorMessage}</p>
                                <button type='submit' className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </form>
                        <Link className='text-center' to={'/login'}>Already have an Account? <span className='text-blue-500'>Login</span> Now</Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;