
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast, } from "react-toastify";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";


const Register = () => {

    const { RegisterUser} = useContext(AuthContext);
    const {GoogleSingIn} = useContext(AuthContext);

    const navigate = useNavigate();


    

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
            form.reset();
           
          }

            // Call RegisterUser from AuthProvider
        RegisterUser(email,password)
        .then(res=>{
          console.log(res.user);
          
     
       
         
        })
        .catch(err=>{
          console.log(err);
        })

          
        })
        .catch(err=>{
          console.log(err);
        })
      
    

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
        navigate('/');

      })
      .catch(err=>{
        console.log(err);
      })


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
                <label className="fieldset-label text-2xl text-black">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="input w-full"
                  placeholder="Enter Your Password"
                />

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

            <div className="">
        
            <button onClick={handleGoogle} className="btn p-y flex gap-1 border mx-auto w-2xs items-center  text-3xl font-bold bg-amber-300">
            <FcGoogle className="text-4xl "></FcGoogle>  Google </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
