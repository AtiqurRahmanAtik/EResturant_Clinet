import axios from "axios";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";


const ProductCard = ({item}) => {
    // console.log(item);

    const {_id,title,description,category,price,discountPercentage,rating} = item;


    // handleBuy Button 
    const handleADD = (item)=>{
      console.log(item);
      try{
        axios.post('http://localhost:5000/card/post',item)
      .then(res=>{
        const result= res.data;
        console.log(result)
        if(result.insertedId){
          toast.success('SuccessFully Add To Card !');
        }
      })
    
       
     
  
    }
    catch(err){
      console.log(err)
    }
  }


    return (
        <div>
            <div className="card bg-base-100  shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
       {title}
      
    </h2>

    <h2>Price : {price}</h2>
    <p> {description}</p>


      {/* Buy Button  */}
    <div className="card-actions justify-evenly my-2">
      <button onClick={()=> handleADD(item)} className="btn text-2xl font-semibold  bg-orange-500">ADD</button>
    

      <Link to={`/${_id}`}> <button className="btn text-2xl font-semibold bg-orange-500">Details</button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default ProductCard;