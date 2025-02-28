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

  const[selectItem, SetSeletedItem] = useState('');

  console.log(selectItem)

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

        // form.reset();

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



      


      // dropdown funcanality here
      const handleSeleted = (e)=> {
        SetSeletedItem(e.target.value);
      }

      if(selectItem == 'A to Z Products'){
        let Uppercase = Item.sort((a,b)=>{
          const laterA =  a.title ;
          const laterB = b.title;

          if(laterA < laterB){
            return -1;
          }
         

        });
        
      }


      if(selectItem == 'Z to A Product'){
        const LowerCase = Item.sort((a,b)=>{
          const letterA = a.title;
          const letterB = b.title;

          if(letterA > letterB){
            return -1;
          }
        })
      }

     if(selectItem == 'High to Low'){

      let highPrice =   Item.sort((a,b) => {
          return b.price - a.price;
        })
     }

     if(selectItem == 'Low to High'){

      let LowPrice =   Item.sort((a,b) => {
          return a.price - b.price;
        })
     }

    //  handleResetButton 
    const handleReset = () =>{
      refetch();
    }




  return (
    <div className="relative">
      <h1 className="text-3xl font-bold text-center my-5 ">
        Our Product Section
      </h1>


{/* searching Input Feild */}
      <div className="text-center  my-2 flex flex-col lg:flex-row  gap-2  justify-center items-center justify-items-center ">

          {/* dropdown mene item here */}
    <div className=" z-10">
      <label htmlFor="for"> Categories</label>
      <form action="">
        <select onClick={handleSeleted} name="item" id="">
        <option value='all'> All</option>
        <option value='A to Z Products'> A to Z Products</option>
        <option value='Z to A Product'> Z to A Products</option>
        <option value='High to Low'> High to Low</option>
        <option value='Low to High'> Low to High</option>
        
         
       
        </select>
      </form>
   </div>


{/* searhing form here */}
        <div>
        <form className="flex justify-center gap-1" onSubmit={handleSearching}>
          <input className="text-2xl p-1"  type="text" name="name" id="" placeholder="Search Item here " />

          <input className="btn bg-amber-500  " type="submit" value="Search" />
        </form>
        </div>

   

   <div className="flex    items-center">
    
   <button onClick={handlePrice} className="btn hidden lg:block  bg-red-500"> {priceButton ? 'High' : "Low" } </button> 
   </div>


   <div>
    <button onClick={handleReset} className="btn bg-red-600"> Reset</button>
   </div>


 
     
     
    

      
      </div>

      {/* sort item here  */}
      

      <div className="grid z-20 gap-3 my-7 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
        {searhingOutPut?.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Product;
