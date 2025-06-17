import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();

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
        setAuthLoading(true);
        return signOut(auth);

    }

    // Google Login
    const signInWithGoogle = () => {
        setAuthLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // Updating User profile
    const profileUpdate = (user,name,photo) => {
        setAuthLoading(true);
        return updateProfile(user, {
            displayName: name,
            photoURL: photo
        })
    }

    // settiog up ovserver
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setAuthLoading(false);
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
        profileUpdate

    }

    return (
        <AuthContext value={authInfo}>

            {children}

        </AuthContext>
    );
};

export default AuthProvider;