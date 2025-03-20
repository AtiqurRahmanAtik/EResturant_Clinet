import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import ProductCard from "./ProductCard";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state >= 0 ? state + 1 : state;
    case "decrement":
      return state <= 0 ? state : state - 1;
    case "multiple":
      return state * 2;
    case "zero":
      return state == '';

    default:
      return state;
  }
};

const About = () => {
    // useReducer here
    const { SetLoader} = useContext(AuthContext);

  const [state, dispatch] = useReducer(counterReducer, 0);

  const [value, SetValue] = useState(true);
  const [products,SetProducts] = useState([]);
  const [selectCategory, SetSelectCategory] = useState('all');
  const [search, SetSearch] = useState('');
  const [sortPriceA_Z, SetSortPriceA_Z] = useState('');
  const [ButtonCategory, SetButtonCategory] = useState('');
  console.log(ButtonCategory);


  // Pagination state


  useEffect(()=>{
    axios.get('http://localhost:5000/product')
    .then(res=>{
      console.log(res.data);
      SetProducts(res.data);
      
      SetLoader(false);
    })
  },[SetLoader])

  const handleButton = () => {
    SetValue(!value);
  };


    
      // categories
        const categoryies = ['all',...new Set(products.map(p=> p.Category)) ];

        // filter Products
        const filterProducts = products.filter((product)=>{
          return (
            (product.Category === selectCategory || selectCategory === 'all') && (product.ProductName.toLowerCase().includes(search.toLocaleLowerCase())) 
            // (products.Category === ButtonCategory)
          )
        })


        // sortPrice and A - Z here
        if(sortPriceA_Z === 'High to Low'){
          const sortValues = filterProducts.sort((a,b)=>{
            return b.Price - a.Price; 
            
          })
        }

        if(sortPriceA_Z === 'Low to High'){
          const sortLowHigh = filterProducts.sort((a,b)=>{
            return a.Price - b.Price; 
            
          })
        }
    
        if(sortPriceA_Z === 'A to Z'){
          const sortA_Z = filterProducts.sort((a,b)=>{
            return a.ProductName.localeCompare(b.ProductName);
          })
        }

        if(sortPriceA_Z === 'Z to A'){
          const sortZ_A = filterProducts.sort((a,b)=>{
            return b.ProductName.localeCompare(a.ProductName);
          })
        }


        const buttonCategory = filterProducts.filter(product=>{
          return product.Category === ButtonCategory;
        })
           // console.log('button : ', buttonCategory)


      
  
             
 
       



        // handleSearch
        const handleSearch = (e)=>{
          e.preventDefault();
          const form = e.target;
          const searchVal = form.name.value;
          SetSearch(searchVal);

          form.reset()

        }


      // handleResetButton here 
      const handleResetButton= ()=>{
        console.log('click reset');

        SetSelectCategory('all');

        SetSearch('');
        SetSortPriceA_Z('');

      }


        // handleCategory Button 
        const handleCategoryButton= (category)=>{
            // console.log(category);

            SetButtonCategory(category);

          

        }



  return (
    <section className="z-0">


      <h1 className="text-2xl text-center font-bold ">
        Count Value : <span className="text-red-600 text-3xl">{state}</span>
      </h1>

    {/* state management here  */}
      <div className=" flex flex-row gap-3 justify-center my-3">
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="btn bg-amber-400"
        >
          Increment
        </button>

        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="btn bg-amber-400"
        >
          Decrement
        </button>

        <button
          onClick={() => dispatch({ type: "multiple" })}
          className="btn bg-amber-400"
        >
          Multiple
        </button>

        <button
          onClick={() => dispatch({ type: "zero" })}
          className="btn bg-amber-400"
        >
          Zero
        </button>
      </div>

      <div className="text-center">
        {value ? (
          <button onClick={handleButton} className="btn text-3xl bg-amber-200">
            {" "}
            on
          </button>
        ) : (
          <button onClick={handleButton} className="btn text-3xl bg-amber-200">
            {" "}
            OFF
          </button>
        )}
      </div>



       {/* Category ways filter here  */}
       <div className="text-center   my-2 flex flex-col lg:flex-row  gap-5  justify-center items-center justify-items-center ">



        {/* select product category dropdown */}
    <div className="flex flex-col">
      <label className="text-2xl font-medium">Filter by Category</label>

    <select value={selectCategory} onChange={(e)=> SetSelectCategory(e.target.value)} >
       
     {
      categoryies.map(category=>  <option key={category} value={category}> {category}</option>)
     }
        
        </select>
    </div>



             {/* Sorting price and A-Z  */}
     
      <div className="flex flex-col">
          <label className="text-2xl font-medium"> Sort By Price & A-Z </label>
          <select onChange={(e)=> SetSortPriceA_Z(e.target.value)} >
            <option value="A to Z">A to Z </option>
            <option value="Z to A">Z to A </option>
            <option value="High to Low">High to Low </option>
            <option value="Low to High">Low to High </option>
          </select>
        </div>



        {/* searhing form here */}
        <div>
        <form onSubmit={handleSearch} className="flex justify-center gap-1" >
          <input  className="text-2xl p-1"  type="text" name="name" id="" placeholder="Search Item here " />

          <input className="btn bg-amber-500  " type="submit" value="Search" />
        </form>
        </div>


        {/* reset Button here  */}
        <div >
          <button onClick={handleResetButton} className="btn bg-orange-500 text-2xl font-semibold ">Reset</button>
        </div>

        </div>


   

{/* button category here  */}
   <section className="my-11 text-center">

    {
      categoryies.map((category)=><button key={category} onClick={()=>handleCategoryButton(category)} className="btn bg-green-500 text-2xl font-normal m-1"> {category}</button>)
    }

   </section>

      {/* product card here  */}
      <section className="my-9">
      <h1 className="text-3xl font-bold text-center my-5"> Our Latest Products  </h1>

      <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
        {
         filterProducts?.map(item=>   <ProductCard key={item._id} item={item}></ProductCard>)
        }
      </div>
      </section>



       {/* Pagination Buttons */}
     


    </section>
  );
};

export default About;
