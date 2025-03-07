import { useEffect,  useState } from "react";
import {  data, useParams } from "react-router";


const ProductDetails = () => {
    const {id} = useParams();
    // console.log(id);

    const [ProductDetails,SetProductDetails] = useState([]);
    console.log(ProductDetails);

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
    } = ProductDetails;

    // title,description,category,price,discountPercentage,rating

    // fetch from db for single id Details api
    useEffect(()=>{
        fetch(`http://localhost:5000/product/${id}`)
        .then(res=> res.json())
        .then(data=> SetProductDetails(data))
    },[id])



    return (
        <div >
            <h1 className="text-3xl font-bold text-center my-7">Product Details of : <span className="text-orange-500"> {ProductDetails.ProductName}</span> </h1>



      <div className="card bg-base-100  min-w-sm">
        <figure>
          <img
            src={ProductImage}
            alt="Shoes"
            className=" max-w-sm"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title mx-auto">{ProductName}</h2>
          
          <div>
            <h2> {Category}</h2>
            <h2> {BrandName}</h2>
          </div>
          <h2>Price : {price}</h2>
          <p> {Description}</p>
          <h2>{Ratings}</h2>

    
        </div>
      </div>
    </div>
       
    );
};

export default ProductDetails;