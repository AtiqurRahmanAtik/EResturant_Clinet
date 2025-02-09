import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <div className="container mx-auto my-9">

            <Outlet></Outlet>
            </div>

            <Footer/>
        </div>
    );
};

export default Main;