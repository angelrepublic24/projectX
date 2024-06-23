import Image from "next/image";
import React from "react";
import { FaReact } from "react-icons/fa";
import { IoBrowsersOutline, IoCalculator } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import ItemSideBar from "./ItemSideBar";


const menuItems = [
    {
        path: '/dashboard/main',
        icon: <IoBrowsersOutline size={40}/>,
        title: 'Dashboard',
        subTitle: 'Visualize'
    },
    {
        path: '/dashboard/product',
        icon: <AiOutlineProduct size={40}/>,
        title: 'Product',
        subTitle: 'Counter client side'
    }
]

export const Sidebar = () => {

  return (
    <div
      id="menu"
      style={{width: '300px'}}
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 h-screen fixed"
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
            <FaReact className="mr-2" />
            <span>Store </span>
            <span className="text-blue-500">Republic</span>.
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your actions and activities
        </p>
      </div>
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Welcome back,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <Image
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
              alt=""
              width={50}
              height={50}
            />
          </span>
          <span className="text-sm md:text-base font-bold">Angel Almonte</span>
        </a>
      </div>

      <div id="nav" className="w-full px-6">
        {menuItems.map(item => (
            <ItemSideBar key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};

