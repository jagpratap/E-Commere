import { useState } from "react";

const PaymentForm = ({
  checkoutToken,
  shippingData,
  onCaptureCheckout,
  handlePaymentBackStep,
}) => {
  const [inputs, setInputs] = useState({
    cardNumber: "",
    cardDate: "",
    cvc: "",
    zip: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const orderData = {
      list_items: checkoutToken.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "Primary",
        street: shippingData.street,
        town_city: shippingData.townCity,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.postalZipCode,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "test_gateway",
        card: {
          number: inputs.cardNumber,
          expiry_month: inputs.cardDate.slice(0, 2),
          expiry_year: inputs.cardDate.slice(2, 4),
          cvc: inputs.cvc,
          postal_zip_code: inputs.zip,
        },
      },
    };
    onCaptureCheckout(checkoutToken.id, orderData);
  };
  const handleChange = (event, length) => {
    const { name, value } = event.target;
    if (value.length <= length) {
      setInputs({ ...inputs, [name]: value });
    }
  };
  return (
    <>
      <div className="text-xl font-medium sm:text-start text-center">Order Summary</div>
      <div className="my-5">
        {checkoutToken.line_items.map((item) => (
          <div key={item.id} className="flex justify-between my-3">
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-slate-500">
                Quantity:
                {" "}
                {item.quantity}
              </p>
            </div>
            <p>{item.line_total.formatted_with_symbol}</p>
          </div>
        ))}
        <div className="flex justify-between my-3">
          <p>Total</p>
          <p className="font-semibold">{checkoutToken.subtotal.formatted_with_symbol}</p>
        </div>
      </div>
      <hr />
      <div className="my-3">
        <div className="text-xl font-medium sm:text-start text-center">Payment method</div>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="flex justify-between h-5 mb-5">
            <div className="flex">
              <span><img src="./assets/images/CreditCard.svg" alt="Credit_Card" className="h-5 mr-2" /></span>
              <input
                type="number"
                placeholder="Valid Card Number"
                name="cardNumber"
                value={inputs.cardNumber}
                onChange={(e) => handleChange(e, 16)}
                className="border-0 outline-none text-sm w-40"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="MM/YY"
                name="cardDate"
                value={inputs.cardDate}
                onChange={(e) => handleChange(e, 4)}
                className="border-0 outline-none text-sm w-12"
                required
              />
              <input
                type="number"
                placeholder="CVC"
                name="zip"
                value={inputs.zip}
                onChange={(e) => handleChange(e, 3)}
                className="border-0 outline-none text-sm w-8"
                required
              />
              <input
                type="number"
                placeholder="ZIP"
                name="cvc"
                value={inputs.cvc}
                onChange={(e) => handleChange(e, 5)}
                className="border-0 outline-none text-sm w-12"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={handlePaymentBackStep}
              className="bg-white hover:bg-slate-100 border-2 border-slate-100 customButton text-black"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 customButton"
            >
              Pay
              {" "}
              {checkoutToken.subtotal.formatted_with_symbol}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
