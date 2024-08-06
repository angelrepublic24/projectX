import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

export default function () {

  const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
  ]

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl"></span>
            <Link href="/cart" className="underline mb-5">Edit cart</Link>

          {/* Items */}
          {
            productsInCart.map(product =>(
              <div className="flex mb-5" key={product.slug}>
                <Image
                src={`/products/${product.images[0]}`}
                width={100}
                height={100}
                alt={product.title}
                className="mr-5 rounded"
                />
                <div>
                <p>{product.title}</p>
                <p>${product.price} * 3</p>
                <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))
          }
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery Address</h2>
              <div className="mb-10">
                <p className="text-xl">Angel Almonte</p>
                <p>Av. Siempre viva 123</p>
                <p>Col. Centro</p>
                <p>Alcaldia Cuauhtemoc</p>
                <p>Ciudad de Mexico</p>
                <p>Zip code. 123123</p>
                <p>123,123,123</p>
              </div>
              <div className="w-full h-0.5 bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>Product's number</span>
              <span className="text-right">3 items</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total: </span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                <span className="texy-xs">
                  Al hacer clck en "Place order", aceptas nuestros <a href="#" className="underline">termínos y condiciones</a> y <a className="underline" href="#">política de privacidad</a>
                </span>
              </p>
              <Link className="flex btn-primary justify-center" href='/orders/123'>
                Place Order
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}