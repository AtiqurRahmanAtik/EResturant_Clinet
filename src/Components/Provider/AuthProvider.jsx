import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase.Config";

export  const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user,SetUser]= useState(null);
    const [loader,SetLoader]= useState(true);

    // Create User
    const RegisterUser= (email,password)=>{
        SetLoader(true);
        return createUserWithEmailAndPassword(auth,email, password)
    }

    // Login User
    const LoginUser = (email,password)=>{
        SetLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    // Observation
   
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, CurrentUser => {
            if (CurrentUser) 
                SetUser(CurrentUser);
            else SetUser(false);
            // console.log('auth sage change : ', CurrentUser);

            SetLoader(false); 
        });
        return () => unSubscribe();

    }, []);



    // AuthInfo
    const AuthInfo = {
        user,
        loader,
        SetLoader,
       
        RegisterUser,
        LoginUser,

    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;