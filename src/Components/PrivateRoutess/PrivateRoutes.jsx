import { useContext,} from "react";
import { Navigate, Outlet, useLocation,  } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoutes = () => {

    const { user,loader} = useContext(AuthContext);
    // console.log('private',user)
    
  const location = useLocation();
  // console.log('location path', location);
    //  const navigate = useNavigate();

    if(loader){
      return <>
     
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </>
     
    }



  return user ? <Outlet/> : <Navigate to="/login" state={{ from: location }} replace />;
  
   
};

export default PrivateRoutes;