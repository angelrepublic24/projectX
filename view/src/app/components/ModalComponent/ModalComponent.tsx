import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import useForm from "@/hooks/useForm";
import { products } from "@/utils/products";
import SelectForm from '../InputForm/SelectForm';
import SubSelectForm from "../InputForm/SubSelectForm";


export const ModalComponent = ({ isVisible, onClose, value }) => {
  const {form, changed} = useForm({})
  const [isDialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);

  const create = (e) => {
    e.preventDefault()
    let newProduct = form
    console.log(newProduct)
    products.push(newProduct)
  }



  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4">{value} product</h2>
        <p className="mb-4">
          This is the dialog content. You can add more text or elements here.
        </p>
        <form action="" onSubmit={create}>
          <div className="flex m-3">
            <SelectForm changed={changed} value={'Category'}/>
            <SubSelectForm changed={changed} value={'Sub-Category'}/>
          </div>
          <div className="flex m-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm
                changed={changed}
                InputValue={"Name"}
                PlaceHolder={"Samsung"}
                name={"name"}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputForm
                changed={changed}
                InputValue={"Description"}
                PlaceHolder={"Great"}
                name={"description"}
              />
            </div>
          </div>
          <div className="flex m-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm
                changed={changed}
                InputValue={"Brand"}
                PlaceHolder={"Samsung"}
                name={"brand"}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputForm
                changed={changed}
                InputValue={"Model"}
                PlaceHolder={"Galaxy"}
                name={"model"}
              />
            </div>
          </div>
          <div className="flex m-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm changed={changed} InputValue={"Stock"} PlaceHolder={0} name={"stock"} />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputForm
                changed={changed}
                InputValue={"Price"}
                PlaceHolder={"$"}
                name={"countInStock"}
              />
            </div>
          </div>
          <div className="flex justify-end">
        <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
            onClick={onClose}
          >
            Close
        </button>
        <input type="submit" value='Save' className="bg-blue-500 text-white px-4 rounded mr-2 hover:bg-gray-700"/>
          {/* <ButtonCrud value={'Save'} event={create}/> */}
        </div>
        </form>
        
      </div>
    </div>
  );
};
