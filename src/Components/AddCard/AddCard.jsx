import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const AddCard = () => {
    
    let {handleADD} = useContext(AuthContext);


    let res = handleADD();
    console.log('addto card ', res)

    
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Add Card Here </h1>
        </div>
    );
};

export default AddCard;