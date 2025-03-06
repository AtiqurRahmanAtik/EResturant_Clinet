import { useReducer, useState } from "react";

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
  const [state, dispatch] = useReducer(counterReducer, 0);

  const [value, SetValue] = useState(true);

  const handleButton = () => {
    SetValue(!value);
  };

  return (
    <div>


      <h1 className="text-2xl text-center font-bold">
        Count Value : <span className="text-red-600 text-3xl">{state}</span>
      </h1>

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
    </div>
  );
};

export default About;
