import { Link } from "react-router";


const ProductCard = ({item}) => {
    console.log(item);

    const {_id,title,description,category,price,discountPercentage,rating} = item;


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
    <p> {description}</p>


      {/* Buy Button  */}
    <div className="card-actions justify-evenly my-2">
      <button className="btn text-2xl font-semibold  bg-orange-500">Buy</button>
      <Link to={`/${_id}`}> <button className="btn text-2xl font-semibold bg-orange-500">Details</button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default ProductCard;