import { Link, useNavigate, } from "react-router";


const NotFound = () => {
    const navigate = useNavigate();

  
    const handleError =()=>{
        navigate('/');
    }

    return (
        <div>
            <h1>Not Found </h1>

           <div className="text-center">
         <button onClick={handleError} className="btn bg-green-400 font-bold text-3xl "> Back Home</button>
           </div>
        </div>
    );
};

export default NotFound;