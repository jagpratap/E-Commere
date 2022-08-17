/* eslint-disable no-console */
import { useEffect, useState } from "react";

import { useUserContext } from "../../../context/UserContext";

import commerce from "../../../lib/commerce";
import AddressForm from "./addressForm";
import PaymentForm from "./paymentForm";
import Confirmation from "./confirmation";

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
  const { cart, setCart } = useUserContext();
  const [phase, setPhase] = useState(1);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState({});
  // Generate Token //
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
        setCheckoutToken(token);
      } catch (error) {
        console.log("[error]", error);
      }
    };
    generateToken();
  }, []);
  // Address Form //
  const handleAddressNextStep = (data) => {
    setShippingData(data);
    setPhase((prevPhase) => prevPhase + 1);
  };
  // Payment Form //
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (tokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(tokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log("[error]", error);
    }
  };
  const handlePaymentBackStep = () => {
    setPhase((prevPhase) => prevPhase - 1);
  };
  const handlePaymentNextStep = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };
  return (
    <div className="border rounded sm:shadow duration-100 sm:hover:shadow-md sm:w-[30rem] w-full mx-auto sm:my-10 p-5">
      <div className="text-center text-3xl font-semibold mb-6">Checkout</div>
      <div className="flex justify-between items-center text-sm">
        {steps.map((step) => {
          if (step.id === 2) return <div key={step.id} className="border sm:w-[8rem] w-1/3 h-0" />;
          return (
            <div key={step.id} className="flex w-100 my-2">
              <div className="w-5 text-white text-center mr-1">
                {(phase > step.stepNum) && <span><img src="./assets/images/CheckCircle.svg" alt="Check_Circle" /></span>}
                <p className={(phase >= step.stepNum) ? "bg-blue-900 rounded-full" : "bg-slate-500 rounded-full"}>
                  {(phase <= step.stepNum) && step.stepNum}
                </p>
              </div>
              <p className={(phase >= step.stepNum) ? "text-black" : "text-slate-500"}>{step.stepName}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        {phase === 1 && (
          <AddressForm
            checkoutToken={checkoutToken}
            handleAddressNextStep={handleAddressNextStep}
          />
        )}
        {phase === 2 && (
          <PaymentForm
            checkoutToken={checkoutToken}
            shippingData={shippingData}
            onCaptureCheckout={handleCaptureCheckout}
            handlePaymentBackStep={handlePaymentBackStep}
            handlePaymentNextStep={handlePaymentNextStep}
          />
        )}
        {phase === 3 && (
          <Confirmation order={order} />
        )}
      </div>
    </div>
  );
};

export default Checkout;
