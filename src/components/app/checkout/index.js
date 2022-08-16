import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUserContext } from "../../../context/UserContext";

import commerce from "../../../lib/commerce";
import AddressForm from "./addressForm";
import PaymentForm from "./paymentForm";

const steps = [
  {
    id: 1,
    stepNum: 1,
    stepName: "Shipping address",
  },
  {
    id: 2,
    stepName: "Border",
  },
  {
    id: 3,
    stepNum: 2,
    stepName: "Payment details",
  },
];

const Checkout = () => {
  const { userCart } = useUserContext();
  const [phase, setPhase] = useState(1);
  const [checkoutToken, setCheckoutToken] = useState(null);
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(userCart.id, { type: "cart" });
        setCheckoutToken(token);
      } catch (error) {
        // console.log(error);
      }
    };
    generateToken();
  }, []);
  return (
    <div className="border rounded sm:shadow duration-100 sm:hover:shadow-md sm:w-[30rem] w-full mx-auto sm:my-10 p-5">
      <div className="text-center text-3xl font-semibold mb-6">Checkout</div>
      <div className="flex justify-between items-center text-sm">
        {steps.map((step) => {
          if (step.id === 2) return <div key={step.id} className="border sm:w-[8rem] w-1/3 h-0" />;
          return (
            <div key={step.id} className="flex w-100 my-2">
              <p className="bg-blue-900 w-5 rounded-full text-white text-center mr-1">{step.stepNum}</p>
              <p>{step.stepName}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        {phase === 1 && <AddressForm checkoutToken={checkoutToken} />}
        {phase === 2 && <PaymentForm />}
      </div>
      <div className="flex justify-between">
        {phase === 1 ? (
          <Link to="/cart">
            {" "}
            <button
              type="button"
              className="bg-white hover:bg-slate-100 border-2 border-slate-100 customButton text-black"
            >
              Back To Cart
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setPhase(1)}
            className="bg-white hover:bg-slate-100 border-2 border-slate-100 customButton text-black"
          >
            Back
          </button>
        )}
        {phase === 2 ? (
          <Link to="/cart">
            {" "}
            <button
              type="button"
              className="bg-blue-700 hover:bg-blue-900 customButton"
            >
              Pay $200
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setPhase(2)}
            className="bg-blue-700 hover:bg-blue-900 customButton"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
