import { useContext, useEffect, useState } from "react";
import { data } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import { motion } from "motion/react";

const TopRatedItem = () => {

    const { loader,SetLoader,} = useContext(AuthContext);
    const [TopRated,SetTopRated]= useState([]);
    // console.log(TopRated);

    const assendingProduct = TopRated.sort((a,b)=> b.Ratings - a.Ratings);

    // console.log(assendingProduct)

    useEffect(()=>{
        fetch('http://localhost:5000/product')
        .then(res=> res.json())
        .then(data=> SetTopRated(data))
        SetLoader(false)
    },[SetLoader])

    if(loader){
      return <>
      <>
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </>
      </>
    }

    
    return (
        <div 
        
        >
            <h1 className="text-3xl font-bold text-center my-7  ">Our Top Rated Products</h1>


            <div
            

            className=" grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {
                    assendingProduct.slice(0,3).map(item=> 

                        <motion.div
                        initial={{opacity:0, y:50}}
                        whileInView={{opacity:1,  y:0}}
                        animate={{rotate:360}}
                        
                        transition={{duration:1.5, delay:0.1, ease: 'easeIn'}}

                        key={item._id} className="card bg-base-100 text-center  shadow-sm ">
              <figure className="px-10 pt-10">
                <img
                
                  src={item.ProductImage}
                  alt="Shoes"
                  className="rounded-xl w-[410px] h-[250px]" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.ProductName}</h2>

                <h2 className="text-2xl text-red-600">{item.Ratings}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </motion.div>)
                }
            </div>
        </div>
    );
};

export default TopRatedItem;