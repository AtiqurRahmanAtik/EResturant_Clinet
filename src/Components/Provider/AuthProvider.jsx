import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase.Config";
import axios from "axios";
import { GoogleAuthProvider } from "firebase/auth";


export  const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user,SetUser]= useState(null);
    const [loader,SetLoader]= useState(true);


    // registerUser get form db api 
    const [registerUser , SetRegisterUser]= useState([]);

    // console.log(registerUser);
    
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

    // Google SingIN
    const GoogleSingIn = ()=>{
        return signInWithPopup(auth, GoogleProvider)
    }

    // SingOUt 
    const SingOutUser = ()=>{
        return signOut(auth)
    }



    // Observation
   
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, CurrentUser => {
          
                SetUser(CurrentUser);
          
            console.log('auth sage change : ', CurrentUser);

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
        GoogleSingIn,
        SingOutUser 

    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;