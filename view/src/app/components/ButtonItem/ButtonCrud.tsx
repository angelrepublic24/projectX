import React from 'react'

const ButtonCrud = ({value, event}) => {
  return (
    <>
      <input
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
            type='submit'
          >
            {value}
        </input>
    </>
  )
}

export default ButtonCrud
