import { useEffect,  useState } from "react";
import {  data, useParams } from "react-router";


const ProductDetails = () => {
    const {id} = useParams();
    // console.log(id);

    const [ProductDetails,SetProductDetails] = useState([]);
    console.log(ProductDetails);

    // title,description,category,price,discountPercentage,rating

    // fetch from db for single id Details api
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${id}`)
        .then(res=> res.json())
        .then(data=> SetProductDetails(data))
    },[id])



    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-7">Product Details of : <span className="text-orange-500"> {ProductDetails.title}</span> </h1>



            <div className="card bg-base-100 text-center shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{ProductDetails.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ProductDetails;