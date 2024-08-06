import React from "react";

const InputForm = ({InputValue, PlaceHolder, name, changed}) => {
  return (
    <>
      <label htmlFor="name">{InputValue}</label>
      <input
        onChange={changed}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id="productName"
        name={name}
        type="text"
        placeholder={PlaceHolder}
      />
    </>
  );
};

export default InputForm;
