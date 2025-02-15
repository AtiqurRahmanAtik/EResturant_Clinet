import { useContext, useState } from "react";
import {Navigate,  } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoutes = ({Component}) => {

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user} = useContext(AuthContext);;
     // const navigate = useNavigate();

 // Your authentication logic goes here...
 
  return isAuthenticated ? <Component/> : <Navigate to="/login" />;
   
};

export default PrivateRoutes;