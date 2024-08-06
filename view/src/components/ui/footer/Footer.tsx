import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href='/'>
        <span className={`${titleFont.className} antialiased font-bold`}>
          Caribbean{" "}
        </span>
        <span>
          {" "}
          | Store{" "}
        </span>

        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link href='/' className="mx-3">
      Privacy & Legal
      </Link>
    </div>
  );
};
