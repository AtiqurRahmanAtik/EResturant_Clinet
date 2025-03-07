import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthProvider";


const CardDetails = ({item, refetch}) => {
  const {
    _id,
    ProductName,
    BrandName,
    Category,
    ProductImage,
    price,
    Description,
   
    Ratings,
    ProductCreationDateTime
  }  = item;


    const {loader} = useContext(AuthContext);


    const handleRemove = (id)=>{
        console.log(id);
        axios.delete(`http://localhost:5000/card/get/${id}`)
        .then(res=> {
            const result = res.data;
            console.log(result);
            if(result?.deletedCount> 0 ){
                 Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Remove Product Successful",
                              showConfirmButton: false,
                              timer: 2000
                            });
            }
        })


    }

    if(loader){
        return <>
          <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        </>
    }

    refetch();

    
    return (
        <div className="card bg-base-100  shadow-sm">
              <figure>
                <img className="w-[410px] h-[250px]"
                  src={ProductImage}
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                   {ProductName}
                  
                </h2>
                <h2> {Category}</h2>
                <h2>{BrandName}</h2>
            
                <h2>Price : {price}</h2>
                <p> {Description}</p>
            
            
               
             <div>
             <button onClick={()=> handleRemove(_id)} className="btn text-2xl font-semibold  bg-orange-500">Remove</button>
             </div>
                
                
            
                  {/* <Link to={`/${_id}`}> <button className="btn text-2xl font-semibold bg-orange-500">Details</button></Link> */}
                </div>
              </div>
     
                   
     
    );
};

export default CardDetails;