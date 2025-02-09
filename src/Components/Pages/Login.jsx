import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {

  const { LoginUser} = useContext(AuthContext);

  const navigate = useNavigate();
 


  const handleLogin = (e)=>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password =form.password.value;

    const loginUsers = {email,password};
    console.log(loginUsers);

    // call loginUser form AuthProvider
    LoginUser(email,password)
    .then(res=>{
      console.log(res);

      if(res){
          Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your Login Successful",
                      showConfirmButton: false,
                      timer: 2000
                    });

                    // navigate to homo
                    navigate('/');
      }

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
            <h1 className="text-5xl font-bold text-center">Login now!</h1>

          </div>

          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <div className="card-body">
              {/* form here */}
              <form onSubmit={handleLogin} className="lg:w-[500px]">
                <label className="fieldset-label text-2xl text-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Email"
                />
                <label className="fieldset-label text-2xl text-black">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="input w-full"
                  placeholder="Password"
                />

                <div className="text-center">
                  <button className="btn bg-orange-500 text-2xl mt-4 w-2xs">
                    Login
                  </button>
                </div>

                <div>
                  <h1 className="text-xl   flex justify-center items-center my-2 font-normal capitalize">
                    Don't Have an account please{" "}
                    <Link
                      to={"/register"}
                      className="btn btn-link text-xl no-underline"
                    >
                      Register
                    </Link>
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
