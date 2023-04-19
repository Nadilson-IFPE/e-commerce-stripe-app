import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Products from "@/components/Products";

const inter = Inter({ subsets: ["latin"] });

interface IProducts {
  _id: string,
  name: string,
  description: string,
  price: number,
  category: string,
  picture: string,
}

export default function Home() {
  const [productsInfo, setProductsInfo] = useState<IProducts[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((json) => setProductsInfo(json));
  }, []);

  // console.log({ productsInfo });

  const categoriesNames = Array.from(new Set(productsInfo.map(p => p.category)));
  // console.log({ categoriesNames });

  return (
    <div className="p-5">
      <input type="text" placeholder="Procurar produtos..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"></input>
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName} id={categoryName}>
            <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>

            <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
              {productsInfo.filter(p => p.category === categoryName).map(productInfo => (
                <div key={productInfo._id} className="px-5 snap-start">
                  <Products {...productInfo} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="py-4">

        </div>
      </div>
    </div>
  );
}
