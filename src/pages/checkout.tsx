import Layout from '@/components/Layout'
import { ProductsContext } from '@/components/ProductsContext';
import { useContext, useEffect, useState } from 'react';

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

export default function CheckoutPage({ products }: ProductsProps) {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
    const [productsInfos, setProductsInfos] = useState<IProducts[]>([]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const uniqueIds = Array.from(new Set(selectedProducts));
        fetch('/api/products?ids=' + uniqueIds.join(','))
            .then(response => response.json())
            .then(json => setProductsInfos(json));
    }, [selectedProducts]);

    function moreOfThisProduct(id: any): void {
        setSelectedProducts((prev: any) => [...prev, id]);
    }

    function lessOfThisProduct(id: any): void {
        const pos = selectedProducts.indexOf(id);
        if (pos !== -1) {
            setSelectedProducts(prev => {
                return prev.filter((value, index) => index !== pos);
            });
        }
    }

    const deliveryPrice = 5;
    let subtotal = 0;
    if (selectedProducts?.length) {
        for (let id of selectedProducts) {
            const price = productsInfos.find((p: any) => p._id === id)?.price || 0;
            subtotal += price;
        }
    }
    const total = subtotal + deliveryPrice;

    return (
        <Layout>
            {!productsInfos.length && (
                <div>no products in your shopping cart</div>
            )}
            {productsInfos.length && productsInfos.map(productInfo => {
                const amount = selectedProducts.filter((id: any) => id === productInfo._id).length;
                if (amount === 0) return;
                return (
                    <div className="flex mb-5 items-center" key={productInfo._id}>
                        <div className="bg-gray-100 p-3 rounded-xl shrink-0" style={{ boxShadow: 'inset 1px 0px 10px 10px rgba(0,0,0,0.1)' }}>
                            <img className="w-24" src={productInfo.picture} alt="" />
                        </div>
                        <div className="pl-4 items-center">
                            <h3 className="font-bold text-lg">{productInfo.name}</h3>
                            <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>
                            <div className="flex mt-1">
                                <div className="grow font-bold">{productInfo.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                <div>
                                    <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                                    <span className="px-2">
                                        {selectedProducts.filter((id: any) => id === productInfo._id).length}
                                    </span>
                                    <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <form action="/api/checkout" method="POST">
                <div className="mt-8">
                    <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address, number" />
                    <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code" />
                    <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your name" />
                    <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email address" />
                </div>
                <div className="mt-8">
                    <div className="flex my-3">
                        <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
                        <h3 className="font-bold">{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </div>
                    <div className="flex my-3">
                        <h3 className="grow font-bold text-gray-400">Delivery:</h3>
                        <h3 className="font-bold">{deliveryPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </div>
                    <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
                        <h3 className="grow font-bold text-gray-400">Total:</h3>
                        <h3 className="font-bold">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </div>
                </div>
                <input type="hidden" name="products" value={selectedProducts.join(',')} />
                <button type="submit" className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg">Pay {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</button>
            </form>
        </Layout>
    )
}