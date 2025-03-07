import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardDetails from "../CardDetails";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AddCard = () => {
  const { loader } = useContext(AuthContext);

  const {
    data: card,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["Card"],
    queryFn: async () => {
      const res = axios.get("http://localhost:5000/card/get");
      return (await res).data;
    },
  });

  console.log(card);

  if (isError) {
    console.log("error card show");
  }

  const totalPrice = card?.reduce((total, cur) => total + cur.Price, 0);

  let totalPricetoFix = totalPrice?.toFixed(2);

  refetch();

  if (loader) {
    return (
      <>
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
      </>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-center">
          Total Add Items : {card?.length}
        </h1>

        <h1 className="text-3xl font-bold text-center">
          Total Price : ${totalPricetoFix}
        </h1>
      </div>

      <div className="grid text-center my-3 gap-3 grid-cols-1 lg:grid-cols-3 ">
        {card?.length < 1 ? (
          <h1 className="text-2xl text-center font-bold text-red-500 ">
            {" "}
            No Card Added Here{" "}
          </h1>
        ) : (
          card?.map((item) => (
            <CardDetails
              refetch={refetch}
              key={item._id}
              item={item}
            ></CardDetails>
          ))
        )}
      </div>
    </div>
  );
};

export default AddCard;
