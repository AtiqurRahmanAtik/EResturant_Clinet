import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from "./Provider/AuthProvider";

const Product = () => {
  const [item, setItem] = useState([]);
  // console.log(item);
  const { loader, SetLoader } = useContext(AuthContext);
  const[searhItem,SetSearhItem] = useState('');

//   all Product data  from user api
  const url = "http://localhost:5000/user";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((out) => setItem(out));
    SetLoader(false);
  }, [SetLoader]);


//   loader here
  if (loader) {
    return (
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
    );
  }

  const titleSearh = item.map(v=> v.title.toLowerCase().includes(searhItem));

  console.log(titleSearh)


      const handleSearching = ()=>{
        console.log('searhing ');
      }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">
        Our Product Section
      </h1>

      <div className="text-center">
        <form onSubmit={handleSearching}>
          <input className="text-2xl p-2" onChange={(e)=>SetSearhItem(e.target.value)} type="text" name="name" id="" placeholder="Searing Item here " />
        </form>
      </div>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
        {item?.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Product;
