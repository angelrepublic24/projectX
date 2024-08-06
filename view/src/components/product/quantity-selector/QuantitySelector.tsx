'use client'
import React, { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props{
    quantity: number
}

export const QuantitySelector = ({quantity}: Props) => {

    const [count, setCount] = useState(quantity);

    const onQuantityChanged = (value: number) =>{
        if(count + value < 1 ) return;

        setCount(count + value);
    }


  return (
    <div className='flex'>
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <input type="number" value={count} className='w-10 text-center mx-3 px-3 rounded'/>
      <button onClick={() => onQuantityChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>

    </div>
  )
}

