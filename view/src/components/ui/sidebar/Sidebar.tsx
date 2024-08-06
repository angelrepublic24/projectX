'use client'
import { useUIStore } from '@/store'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { 
    IoCloseCircleOutline, 
    IoLogInOutline, 
    IoLogOutOutline, 
    IoPeopleOutline, IoPersonOutline, 
    IoSearchOutline, 
    IoShirtOutline, 
    IoTicketOutline 
} from 'react-icons/io5'

export const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    // const openMenu = useUIStore(state => state.openSideMenu);

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen &&
        <div 
        className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
        />
      }
      
      {/* Background bluer */}
      {isSideMenuOpen &&
      <div
      onClick={closeMenu}
      className='fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur fade-in'
      />
      }
      

      {/* Side menu */}
      <nav className={
        clsx("fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 hide-scroll",
            {
                'translate-x-full': !isSideMenuOpen
            }
        )
      }>
        <IoCloseCircleOutline 
        size={50} 
        className='absolute top-5 right-5 cursor-pointer' 
        onClick={closeMenu}
        />

        <div className='relative mt-14'>
            <IoSearchOutline size={20} className='absolute top-2 left-2'/>
            <input 
            type="text"
            placeholder='Search'
            className='w-full bg-gray-50 pl-10 py-1 pr-10 border-b-2 rounded text-xl border-gray-200 focus:outline-none focus:border-blue-500' />
        </div>

        <Link href='/' className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
            <IoPersonOutline size={20}/>
            <span className='ml-3 text-xl'>Profile</span>
        </Link>

        <Link href='/' className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
            <IoTicketOutline size={20}/>
            <span className='ml-3 text-xl'>Orders</span>
        </Link>

        <Link href='/' className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
            <IoLogInOutline size={20}/>
            <span className='ml-3 text-xl'>Log In</span>
        </Link>

        <Link href='/' className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
            <IoLogOutOutline size={20}/>
            <span className='ml-3 text-xl'>Log out</span>
        </Link>

        <div className='w-full h-px bg-gray-200 my-10'/>
        <Link href='/' className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
            <IoShirtOutline size={20}/>
            <span className='ml-3 text-xl'>Products</span>
        </Link>

        <Link href='/' className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
            <IoTicketOutline size={20}/>
            <span className='ml-3 text-xl'>Orders</span>
        </Link>

        <Link href='/' className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
            <IoPeopleOutline size={20}/>
            <span className='ml-3 text-xl'>Users</span>
        </Link>

      </nav>
    </div>
  )
}

