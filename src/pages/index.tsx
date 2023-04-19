import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Products from "@/components/Products";
import { GetServerSideProps } from "next";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";

const inter = Inter({ subsets: ["latin"] });

interface IProducts {
  _id: string,
  name: string,
  description: string,
  price: number,
  category: string,
  picture: string,
}

type ProductsProps = {
  products: Array<IProducts>
}

export default function Home({ products }: ProductsProps) {
  const [phrase, setPhrase] = useState('')

  // console.log({ productsInfo });

  const categoriesNames = Array.from(new Set(products.map(p => p.category)));
  // console.log({ categoriesNames });

  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (
    <div className="p-5">
      <input type="text" value={phrase} onChange={e => setPhrase(e.target.value)} placeholder="Search for products..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"></input>
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName} id={categoryName}>
            {products.find(p => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>

                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products.filter(p => p.category === categoryName).map(productInfo => (
                    <div key={productInfo._id} className="px-5 snap-start">
                      <Products {...productInfo} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {

  await initMongoose();

  const products = await findAllProducts()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

