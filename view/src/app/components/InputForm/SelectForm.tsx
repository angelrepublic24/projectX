
const SelectForm = ({changed, value}) => {
  return (
    <>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="category"
              >
                {value}
              </label>
              <div className="relative">
                <select
                name="category"
                  onChange={changed}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-category"
                  defaultValue={'category'}

                >
                    <option value={'category'}>All Category</option>
                  <option value={'electronics'}>Electronics</option>
                  <option value={'clothes'}>Clothes, Shoes</option>
                  <option value={'music'}>Musical Instruments</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
    </>
  )
}
// const SubSelectForm = ({changed, value}) => {
//     return (
//       <>
//         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                 <label
//                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="category"
//                 >
//                   {value}
//                 </label>
//                 <div className="relative">
//                   <select
//                     onChange={changed}
//                     className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                     id="grid-category"
  
//                   >
//                     <option>Cellphone</option>
//                     <option>Laptops</option>
//                     <option>Tablets</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                     <svg
//                       className="fill-current h-4 w-4"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//       </>
//     )
//   }

export default SelectForm
    
