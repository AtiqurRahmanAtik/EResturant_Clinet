import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from "./Provider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Product = () => {
  // const [item, setItem] = useState([]);

  const [priceButton, SetPriceButton] = useState(true);
  const[BigPrice,SetBigPrice]= useState([]);
  const[HighPrice , SetHighPrice] = useState([]);


  // console.log(BigPrice);

  // console.log(item);
  const { loader, SetLoader } = useContext(AuthContext);
  const [searhItem,SetSearhItem] = useState('');

  // console.log(searhItem)

   // show big Price 
   useEffect(()=>{
    axios.get('http://localhost:5000/bigPice')
    .then(res=> SetBigPrice(res.data))
    .catch(err=>{
      console.log(err)
    })
  },[])

//   all Product data  from user api
  // const url = "http://localhost:5000/user";
  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
   
  //   .then(data=> setItem(data))
  //   SetLoader(false);
  // }, [SetLoader]);


  // using  Tanstack Query
  const {data: Item,isLoading,refetch} = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/user')
      return res.data;
      
    },
   
  })

//   loader here
  if (isLoading) {
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
  };

  refetch();


    const searhingOutPut = Item?.filter(val=> val.title?.toLowerCase().includes(searhItem.toLowerCase()));

  // console.log(searhingOutPut);



    // console.log(searhItem);

      const handleSearching = (e)=>{
        e.preventDefault();
        const form = e.target;
        const searchVal = form.name.value;
        SetSearhItem(searchVal);

        // console.log('searhing ', searchVal);

       
      };


     
      const bigPrice = BigPrice.sort((a,b)=> b.price - a.price);
      // console.log(bigPrice)
      // handle Price 
      const handlePrice= ()=>{
        // SetPriceButton(priceButton)
        SetPriceButton(!priceButton);
        SetHighPrice(bigPrice)
      }


  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">
        Our Product Section
      </h1>


{/* searching Input Feild */}
      <div className="text-center  my-2 flex gap-2 justify-center justify-items-center ">
        <form onSubmit={handleSearching}>
          <input className="text-2xl p-2"  type="text" name="name" id="" placeholder="Searing Item here " /> <br />

          <input className="btn bg-amber-500 my-1" type="submit" value="Search" />
        </form>

    <div >

   
       <button onClick={handlePrice} className="btn bg-red-500"> {priceButton ? 'High' : "Low" } </button> 
     
     
    </div>

      
      </div>

      {/* sort item here  */}
      

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
        {searhingOutPut?.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Product;
