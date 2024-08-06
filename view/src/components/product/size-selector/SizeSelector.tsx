'use client'
import type { Sizes } from '@/interfaces'
import clsx from 'clsx';
import React from 'react'

interface Props{
    selectedSize: Sizes;
    availableSize: Sizes[];
}

export const SizeSelector = ({selectedSize, availableSize}: Props) => {
  return (
    <div className='my-5 '>
        <h3 className='font-bold mb-4 '>Available sizes</h3>
        <div className='flex'>
            {
                availableSize.map(size => (
                    <button key={size} className={
                        clsx('mx-2 hover:underline text-lg',{
                            'bg-gray-300 rounded-md p-2': size === selectedSize
                        })
                    }>{size}</button>
                ))
            }
        </div>

    </div>
  )
}

