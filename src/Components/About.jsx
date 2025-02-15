import { useState } from "react";


const About = () => {

    const [value,SetValue] = useState(true);

    const handleButton = ()=>{
        SetValue(!value)
    }


    return (
        <div>
              <h1 className="text-3xl font-bold text-center my-7">About Components</h1>


              <div className="text-center">
             

                    {
                        value ?     <button onClick={handleButton} className="btn text-3xl bg-amber-200"> on</button> :
                        <button onClick={handleButton} className="btn text-3xl bg-amber-200"> OFF</button>                 
                    }
              </div>
        </div>
    );
};

export default About;