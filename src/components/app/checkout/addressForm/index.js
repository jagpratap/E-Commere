import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import commerce from "../../../../lib/commerce";

const inputFields = [
  {
    id: 1,
    type: "text",
    name: "firstName",
    placeholder: "First name*",
  },
  {
    id: 2,
    type: "text",
    name: "lastName",
    placeholder: "Last name*",
  },
  {
    id: 3,
    type: "text",
    name: "phoneNumber",
    placeholder: "Phone number*",
  },
  {
    id: 4,
    type: "email",
    name: "email",
    placeholder: "Email*",
  },
  {
    id: 5,
    type: "text",
    name: "street",
    placeholder: "Street*",
  },
  {
    id: 6,
    type: "text",
    name: "townCity",
    placeholder: "City/town*",
  },
  {
    id: 7,
    type: "text",
    name: "postalZipCode",
    placeholder: "Postal Zip Code*",
  },
];
const AddressForm = ({ checkoutToken, handleAddressNextStep }) => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    street: "",
    townCity: "",
    postalZipCode: "",
  });
  // Shipping Country
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  // Shipping Subdivision
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  // Shipping Option
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  // Fetching Shipping Countries
  useEffect(() => {
    const fetchShippingCountries = async (token) => {
      const { countries } = await commerce.services.localeListShippingCountries(token);
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[1]);
    };
    fetchShippingCountries(checkoutToken);
  }, []);
  // Fetching Shipping Subdivisions
  useEffect(() => {
    const fetchShippingSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[1]);
    };
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);
  // Fetching Shipping Options
  useEffect(() => {
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
      const response = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
      setShippingOptions(response);
      setShippingOption(response[0].id);
    };
    if (shippingSubdivision) fetchShippingOptions(checkoutToken, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
  const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description}-(${sO.price.formatted_with_symbol})` }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ...inputs,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    };
    handleAddressNextStep(formData);
  };

  return (
    <>
      <div className="text-xl font-medium sm:text-start text-center">Shipping address</div>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          {inputFields.map((inputField) => (
            <div key={inputField.id} className="h-8 my-3">
              <input
                type={inputField.type}
                placeholder={inputField.placeholder}
                name={inputField.name}
                value={inputs[inputField.name]}
                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                className="border-b duration-100 hover:border-b-2 hover:border-black outline-none focus:border-b-2 focus:!border-blue-700"
                required
              />
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2">
          <div className="flex flex-col h-16 mt-1 w-4/5">
            <label htmlFor="countries" className="text-slate-500">Shipping Country</label>
            <select
              name="countries"
              id="countries"
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              className="border-b duration-100 hover:border-b-2 hover:border-black outline-none focus:border-b-2 focus:!border-blue-700 cursor-pointer"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col h-16 mt-1 w-4/5">
            <label htmlFor="subdivisions" className="text-slate-500">Shipping Subdivision</label>
            <select
              name="subdivisions"
              id="subdivisions"
              value={shippingSubdivision}
              onChange={(e) => setShippingSubdivision(e.target.value)}
              className="border-b duration-100 hover:border-b-2 hover:border-black outline-none focus:border-b-2 focus:!border-blue-700 cursor-pointer"
            >
              {subdivisions.map((Subdivision) => (
                <option key={Subdivision.id} value={Subdivision.id}>{Subdivision.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col h-16 mt-1 w-4/5">
            <label htmlFor="options" className="text-slate-500">Shipping Options</label>
            <select
              name="options"
              id="options"
              value={shippingOption}
              onChange={(e) => setShippingOption(e.target.value)}
              className="border-b duration-100 hover:border-b-2 hover:border-black outline-none focus:border-b-2 focus:!border-blue-700 cursor-pointer"
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <Link to="/cart">
            {" "}
            <button
              type="button"
              className="bg-white hover:bg-slate-100 border-2 border-slate-100 customButton text-black"
            >
              Back To Cart
            </button>
          </Link>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-900 customButton"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
