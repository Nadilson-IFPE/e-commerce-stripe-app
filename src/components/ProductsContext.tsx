import React from 'react'
import { createContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

interface ProductsContextProviderProps {
    children: React.ReactNode;
}

interface Products {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    picture: string,
}

interface ProductsContextData {
    selectedProducts: Products[];
    setSelectedProducts: React.Dispatch<React.SetStateAction<Products[]>>;
}

export const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsContextProvider({ children, }: ProductsContextProviderProps): JSX.Element {
    const [selectedProducts, setSelectedProducts] = useLocalStorageState<any[]>('cart', { defaultValue: [] });
    return (
        <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}
