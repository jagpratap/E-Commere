/* eslint-disable arrow-body-style */
import React from "react";
import { Link } from "react-router-dom";

const Confirmation = ({ order }) => {
  if (!order) return <div>Loading...</div>;
  return (
    <>
      <div className="text-xl font-medium text-start mb-5">
        Thank you for your purchase,
        {" "}
        {order.customer.firstname}
      </div>
      <hr className="mb-4" />
      <small className="block mb-4">
        Order ref:
        {" "}
        {order.customer_reference}
      </small>
      <Link to="/">
        <button
          type="button"
          className="bg-white hover:bg-slate-100 border-2 border-slate-100 customButton text-black"
        >
          Back To Home
        </button>
      </Link>
    </>
  );
};

export default Confirmation;
