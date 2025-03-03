import { useContext,} from "react";
import { Outlet, useNavigate,  } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoutes = () => {

    
    const { user} = useContext(AuthContext);;
     const navigate = useNavigate();


  return user ? <Outlet/> : navigate('/login')
   
};

export default PrivateRoutes;