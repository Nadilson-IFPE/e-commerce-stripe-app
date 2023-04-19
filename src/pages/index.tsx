import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((json) => setProductsInfo(json));
  }, []);

  // console.log({ productsInfo });

  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl">Mobiles</h2>
        <div className="py-4">
          <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
              <img src="/products/iphone.png" alt="" />
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">iPhone</h3>
            </div>
            <p className="text-sm mt-1 leading-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              molestias aliquid voluptas, autem atque praesentium nostrum nihil
              expedita? Ab est excepturi quas repellat. Esse minima laborum at
              excepturi accusamus architecto.
            </p>
            <div className="flex mt-1">
              <div className="text-2xl font-bold grow">R$ 10.000,00</div>
              <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
