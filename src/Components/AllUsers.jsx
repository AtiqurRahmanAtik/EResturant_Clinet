import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import Swal from "sweetalert2";




const AllUsers = () => {

    const {registerUser}= useContext(AuthContext);

     // HandleDeleteUser 
     const handleDeleteUser = (id)=>{
      console.log('delete Id ', id)
      axios.delete(`http://localhost:5000/register/${id}`)
      .then(res=>{
          // console.log(res.data)
          if(res.data.deletedCount > 0){
               Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Delete User Successful",
                        showConfirmButton: false,
                        timer: 2000
                      });
          }
          
        
      })
      .catch(err=>{
          console.log(err);
      })
  }


    




    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-7">All Users </h1>


            <div>
                
                              <div  className="overflow-x-auto">
                        <table className="table table-zebra">
                          {/* head */}
                          <thead>
                            <tr className="border">
                              <th className="border text-center text-2xl font-semibold  text-black">S.No.</th>
                              <th className="border text-center  text-2xl font-semibold text-black">Name</th>
                              <th className="border text-center text-2xl font-semibold text-black">Email</th>
                              <th className="border text-center text-2xl font-semibold text-black">Password</th>
                              <th className="border text-center text-2xl font-semibold text-black">Update</th>
                              <th className="border text-center text-2xl font-semibold text-black">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* row 1 */}
                          {
                            registerUser?.map((item,index)=>   <tr className="border text-center text-xl" key={item?._id}>
                            <th  className="border text-center text-xl">{index+1}</th>
                            <td className="border text-center text-xl">{item.name}</td>
                            <td className="border text-center text-xl">{item.email}</td>
                            <td className="border text-center text-xl">{item.password}</td>
                            <td className="border text-center text-xl">
                            <Link to={`/update/${item._id}`}>   <button className="btn text-black">Update</button></Link>
                              </td>
                            <td className="border text-center text-xl">
                              <button onClick={()=>handleDeleteUser(item?._id)} className="btn text-red-500">Delete</button>
                              </td>
                          </tr>)
                          }
                           
                           
                          </tbody>
                        </table>
                      </div>
                
            </div>
        </div>
    );
};

export default AllUsers;