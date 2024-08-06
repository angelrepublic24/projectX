import { Title } from "@/components";
import Image from "next/image";
import { redirect } from "next/navigation";
import {ProductGrid} from '../../components';
import { initialData } from "@/seed/seed";

const products = initialData.products;


export default function Home() {
  if(products.length === 0){
    redirect('/')
  }
  return (
  <>
    <Title
      title="Store"
      subTitle="All Products"
      className="mb-2"
    />
    <ProductGrid products={products} />
  </>
  );
}
