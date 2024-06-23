import Image from "next/image";
import NavBar from "@/Layout/NavBar";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/dashboard/product');
  return (
  <></>
  );
}
