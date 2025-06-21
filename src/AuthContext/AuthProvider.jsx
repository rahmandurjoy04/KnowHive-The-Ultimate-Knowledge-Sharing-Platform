import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const [allArticles, setAllArticles] = useState(null);
    const [allArticlesLoading, setAllArticlesLoading] = useState(true);



    // Getting All Articles
    useEffect(() => {
        axios.get('http://localhost:3000/articles')
            .then(res => {
                setAllArticlesLoading(false);
                setAllArticles(res.data);

            })
            .catch(err => console.error(err));
    }, []);

    const createUser = (email, password) => {
        setAuthLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // User Login
    const loginUser = (email, password) => {
        setAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // UserSignOut
    const signOutUser = () => {
        localStorage.removeItem("token")
        return signOut(auth);

    }

    // Google Login
    const signInWithGoogle = () => {
        setAuthLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // Updating User profile
    const profileUpdate = async (user, name, photo) => {
        setAuthLoading(true);
        await updateProfile(user, {
            displayName: name,
            photoURL: photo
        })

        // Update local user state
        const updatedUser = {
            ...user,
            displayName: name,
            photoURL: photo
        };
        setUser(updatedUser);
        setAuthLoading(false);
        return updatedUser;
    };

    // settiog up ovserver
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setAuthLoading(false);
            if (currentUser?.email) {
                const userData = { email: currentUser.email };
                axios.post('http://localhost:3000/jwt', userData)
                    .then(res => {
                        const token = res.data.token;
                        localStorage.setItem("token", token)
                    })
                    .catch(error => console.log(error))
            }
            else {
                localStorage.removeItem("token")
            }
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        authLoading,
        createUser,
        loginUser,
        user,
        signOutUser,
        signInWithGoogle,
        profileUpdate,
        allArticlesLoading,
        allArticles,
        setAllArticles

    }

    return (
        <AuthContext.Provider value={authInfo}>

            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;