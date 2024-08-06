'use client'
import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import Link from "next/link";
import { IoCarOutline, IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = useUIStore(state => state.openSideMenu)
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Carribean
          </span>
          <span>Store</span>
        </Link>
      </div>

      {/* Center menu  */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={`/category/men`}
        >
          Men
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={`/category/women`}
        >
          Women
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={`/category/kid`}
        >
          Kids
        </Link>
      </div>

      <div className="flex items-center">
        <Link className="mx-2" href={`/search`}>
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link className="mx-2" href={`/cart`}>
          <div className="relative">
            <span className="absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">3</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button className="m-2 px-2 rounded-md transition-all hover:bg-gray-100" onClick={openMenu}>
            Menu
        </button>
      </div>
    </nav>
  );
};

