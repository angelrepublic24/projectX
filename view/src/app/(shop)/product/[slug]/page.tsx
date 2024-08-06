import { MobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props{
  params: {
    slug: string;
  }
}

export default function({params}: Props) {

  const {slug} = params
  const product = initialData.products.find(product => product.slug === slug)

  if(!product){
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slide show */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobile */}
        <MobileSlideShow title={product.title} images={product.images} className="block md:hidden"/>
        {/* Desktop */}
        <ProductSlideShow title={product.title} images={product.images} className="hidden md:block"/>



      </div>
      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* Size options */}
        <SizeSelector availableSize={product.sizes} selectedSize={product.sizes[0]} />
        {/* Quantity */}
        <QuantitySelector  quantity={2}/>
        {/* Button */}
        <button className="btn-primary my-5">
          Add to cart
        </button>
        {/* Description */}
        <div>
          <h3 className="font-bold text-sm">Description</h3>
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
}