import axios from "axios";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import PropTypes from "prop-types";

const ProductCard = ({ item }) => {
  // console.log(item);

  const {
    _id,
    ProductName,
    BrandName,
    Category,
    ProductImage,
    Price,
    Description,
   
    Ratings,
    ProductCreationDateTime
  } = item;

  // handleBuy Button
  const handleADD = (item) => {
    console.log(item);
    try {
      axios.post("http://localhost:5000/card/post", item).then((res) => {
        const result = res.data;
        console.log(result);
        if (result.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "ADD Product Successful",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <dev >

      <motion.div 
    //  initial={{ opacity:0}}
    //  whileInView={{opacity:1}}
    
    //  transition={{duration:0.5, delay:0.1}}

    initial={{opacity:0, y:70}}
    whileInView={{opacity:1,  y:0}}
    animate={{rotate:360}}
    
    transition={{duration:0.7 , delay:0.1, ease:'easeIn' }}
      
      className="card bg-base-100  shadow-sm">
        <figure>
          <img
          className="w-[410px] h-[250px]"
            src={ProductImage}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{ProductName}</h2>
          
          <div>
            <h2> Category :  {Category}</h2>
            <h2> BrandName : {BrandName}</h2>
          </div>
          <h2>Price : ${Price}</h2>
          <p> {Description}</p>
          <h2> Ratings :{Ratings}</h2>

          {/* Buy Button  */}
          <div className="card-actions justify-evenly my-2">
            <button
              onClick={() => handleADD(item)}
              className="btn text-2xl font-semibold  bg-orange-500"
            >
              ADD
            </button>

            <Link to={`/${_id}`}>
              {" "}
              <button className="btn text-2xl font-semibold bg-orange-500">
                Details
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </dev>
  );
};





//  PropTypes validation
ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ProductName: PropTypes.string.isRequired,
    BrandName: PropTypes.string.isRequired,
    Category: PropTypes.string.isRequired,
    ProductImage: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Ratings: PropTypes.number.isRequired,
    ProductCreationDateTime: PropTypes.string.isRequired, // can be string or Date
  }).isRequired
}

export default ProductCard;
