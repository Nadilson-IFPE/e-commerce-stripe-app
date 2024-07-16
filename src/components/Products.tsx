import Image from "next/image";
import { useContext } from 'react';
import { ProductsContext } from "./ProductsContext";


interface ProductsProps {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    picture: string,
}

export default function Products({ _id, name, price, description, picture }: ProductsProps) {
    const { setSelectedProducts } = useContext(ProductsContext);
    function addProduct() {
        setSelectedProducts((prev: any) => [...prev, _id])
        //  console.log('ID: ', _id)
    }

    return (
        <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
                <Image src={`${picture}`} alt={""} width={256} height={256} />
            </div>
            <div className="mt-2">
                <h3 className="font-bold text-lg">{name}</h3>
            </div>
            <p className="text-sm mt-1 leading-4">
                {description}
            </p>
            <div className="flex mt-1">
                <div className="text-2xl font-bold grow">{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                <button onClick={addProduct} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">
                    +
                </button>
            </div>
        </div>
    )
}