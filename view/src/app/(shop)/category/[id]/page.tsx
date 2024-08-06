import { ProductGrid, Title } from "@/components";
import { Product, Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props{
  params: {
    id: Category
  }
}

const products = initialData.products;

export default function({params}: Props) {
  const {id} = params
  const product = products.filter(p => p.gender === id)

  const labels: Record<Category, string> = {
    'men': "Men's",
    'women': "Women's",
    'kid': "Kids's",
    'unisex': "Unisex's"
  }

  // if(id === 'electronics'){
  //   notFound()
  // }
  
  return (
    <>
      <Title
      title={`${labels[id]} products`}
      subTitle="All Products"
      className="mb-2 capitalize"
    />
    <ProductGrid products={product}/>
    </>
  );
}