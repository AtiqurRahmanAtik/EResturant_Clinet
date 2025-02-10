import {  useEffect, useState,  } from "react";
import { useParams } from "react-router";

import axios from "axios";
import Swal from "sweetalert2";

const RegisterUserUpdate = () => {

    const {id} = useParams();
    console.log(id);
    const [updateRegister,SetUpdateRegister]= useState([]);
    

    // get data registerUser form api register Single Id data
    useEffect(()=>{
        axios.get(`http://localhost:5000/register/${id}`)
        .then(res=>{
           SetUpdateRegister(res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[id])


   
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-9">Register User Update</h1>


            <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <div className="card-body mx-auto">
              {/* form here */}
              <form   className="lg:w-[500px] ">
                <label className="fieldset-label text-2xl text-black">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={updateRegister.name}
                  className="input w-full"
                  placeholder="Enter Your Name"
                 
                />
                <label className="fieldset-label text-2xl text-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={updateRegister.email}
                  className="input w-full"
                  placeholder="Enter Your Email"
                />
                <label className="fieldset-label text-2xl text-black">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue={updateRegister.password}
                  className="input w-full"
                  placeholder="Enter Your Password"
                />

                <div className="text-center">
                  <button  className="btn bg-orange-500 text-2xl mt-4 w-2xs">
                    Update Register
                  </button>
                </div>

                
              </form>
            </div>
          </div>
        </div>
    );
};

export default RegisterUserUpdate;