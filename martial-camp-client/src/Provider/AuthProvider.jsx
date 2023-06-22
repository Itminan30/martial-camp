import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { app } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    }

    const signWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            setUser(loggedUser);

            // get and set token
            if(loggedUser){
                axios.post(`${import.meta.env.VITE_API_LINK}/jwt`, {email: loggedUser.email})
                .then(data => {
                    // console.log(data.data.token);
                    localStorage.setItem("access-token", data.data.token);
                    setLoading(false);
                })
            }
            else {
                localStorage.removeItem("access-token");
            }
        })

        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUser,
        signWithGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;