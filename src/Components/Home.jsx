import Product from "./Product";
import TopRatedItem from "./TopRatedItem";


const Home = () => {
    return (
        <div>
            {/* <h1 className="text-3xl text-center font-bold my-11"> This is Home Components</h1> */}

            {/* Product section */}
            <Product/>
            {/* TopRated Product */}
            <TopRatedItem/>

        </div>
    );
};

export default Home;