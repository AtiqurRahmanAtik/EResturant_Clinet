import {  useEffect, useState,  } from "react";
import { useNavigate, useParams } from "react-router";

import axios from "axios";
import Swal from "sweetalert2";

const RegisterUserUpdate = () => {

    const {id} = useParams();
    console.log(id);
    const navigate = useNavigate();

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


    // handleUpdate User
    const handleUpdateUser=(e)=>{
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const name = form.name.value;
      const password = form.password.value;
      
      const updateUser = {name,email,password};
      console.log(updateUser);

      // update spacefice id of data or RegisterUser
      axios.put(`http://localhost:5000/register/${id}`, updateUser)
      .then(res=>{
        console.log(res.data);

         if(res.data.modifiedCount > 0){
        


          Swal.fire({
                      position: "top-end",
                       icon: "success",
                       title: "Your Registration Successful",
                      showConfirmButton: false,
                      timer: 2000
                     });
       }

      //  navigate to alluser page
       navigate('/allUser')

      })
      .catch(err=>{
        console.log(err);
      })
    }


   
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-9">Register User Update</h1>
            
            <h1 className="text-3xl font-bold text-center my-9">Register User Update</h1>

            
            

            <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <div className="card-body mx-auto">
              {/* form here */}
              <form onSubmit={handleUpdateUser}   className="lg:w-[500px] ">
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