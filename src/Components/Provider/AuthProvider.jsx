import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase.Config";
import axios from "axios";

export  const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user,SetUser]= useState(null);
    const [loader,SetLoader]= useState(true);


    // registerUser get form db api 
    const [registerUser , SetRegisterUser]= useState([]);

    console.log(registerUser);
    
    axios.get('http://localhost:5000/register')
    .then(res=>{
       SetRegisterUser(res.data)
    })
    .catch(err=>{
        console.log(err);
    })


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
        registerUser,

    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;