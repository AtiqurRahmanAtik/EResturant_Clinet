
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast, } from "react-toastify";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { BsFacebook } from "react-icons/bs";



const Register = () => {

    const { RegisterUser,  FacebookLogin,GoogleSingIn} = useContext(AuthContext);
   
    const [show, SetShow] = useState(true);
    console.log('show', show)

    const navigate = useNavigate();
    const location = useLocation();
    const  from  = location.state || { from: { pathname: "/" } };


    

    // HandleRegister Form
    const handleRegister = (e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const registerUser= {name,email,password};
        console.log(registerUser);

        axios.post('http://localhost:5000/register',registerUser)
        .then(res=>{
         
          const result = res.data;
          const token = res.data.token;
          

        console.log(result);
          if(result.insertedId ){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Registration Successful",
              showConfirmButton: false,
              timer: 2000
            });

            // reset form
            // form.reset();
           
          }

            // Call RegisterUser from AuthProvider
        RegisterUser(email,password)
        .then(res=>{
          console.log(res.user);
          // localStorage.setItem('token', res.user.accessToken)
          
     
       
         
        })
        .catch(err=>{
          console.log(err);
        })

          
        })
        .catch(err=>{
          console.log(err);
        })
      
        navigate(from, { replace: true });
    

    }

    // handleGoogleSingIN
    const handleGoogle = ()=>{
      console.log('google');

      GoogleSingIn()
      .then(res=>{
        console.log(res.user);
        
        // sweet alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Google Registration Successful",
          showConfirmButton: false,
          timer: 2000
        });

        // navigate into home page 
        // navigate('/');
        navigate(from, { replace: true });

      })
      .catch(err=>{
        console.log(err);
      })


    }



    // handleFacebook
    const handleFacebook =() =>{

      console.log('facebook login ');

      FacebookLogin()
      .then(res=>{
          console.log(res.user);
          if(res.user){
                   // sweet alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Facebook Registration Successful",
          showConfirmButton: false,
          timer: 2000
        });

        // navigate into home page 
        // navigate('/');
        navigate(from, { replace: true });
          }
       


      })
      .catch(err=>{
        console.log(err);
      })
    }


    // handleEyeButton 
    const handleEyeButton = ()=>{
     
      SetShow(!show);
    }

   

  return (
    <div>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">Register now!</h1>
          </div>

          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <div className="card-body">
              {/* form here */}
              <form onSubmit={handleRegister} className="lg:w-[500px]">
                <label className="fieldset-label text-2xl text-black">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="input w-full"
                  placeholder="Enter Your Name"
                 
                />
                <label className="fieldset-label text-2xl text-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Enter Your Email"
                />
                <div className="relative ">
                <label className="fieldset-label text-2xl text-black">
                  Password
                </label>

                <input
                  type={show ? "text" : "password" }
                  name="password"
                  className="input w-full"
                  placeholder="Enter Your Password"
                />
             

               {
                show ?  <IoEyeSharp onClick={handleEyeButton} className="text-4xl absolute bottom-1 right-2"> </IoEyeSharp> :    <BsEyeSlashFill onClick={handleEyeButton} className="text-4xl absolute bottom-1 right-2"></BsEyeSlashFill>
               }
                </div>
              

                <div className="text-center">
                  <button className="btn bg-orange-500 text-2xl mt-4 w-2xs">
                    Register
                  </button>
                </div>

                <div>
                  <h1 className="text-xl   flex justify-center items-center my-2 font-normal capitalize">
                    Do You Have an account please{" "}
                    <Link
                      to={"/login"}
                      className="btn btn-link text-xl no-underline"
                    >
                      Login
                    </Link>
                  </h1>
                </div>
              </form>

{/* Social Login */}
            <div className=" flex gap-2 flex-col-1 lg:flex-row justify-center items-center justify-items-center">
        
        <div>
            <button onClick={handleGoogle} className="btn p-y flex gap-1 border mx-auto w-[230px] items-center  text-3xl font-bold bg-amber-300">
            <FcGoogle className="text-4xl "></FcGoogle>  Google </button>
            </div>
           


            <div className="">
        
        <button onClick={handleFacebook} className="btn p-y flex gap-1 border mx-auto w-[230px] items-center  text-3xl font-bold bg-amber-300">
        <BsFacebook className="text-4xl text-blue-600"></BsFacebook>  FaceBook </button>
       
        </div>

        </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
