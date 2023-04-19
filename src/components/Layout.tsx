import React from 'react'
import Footer from './Footer'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <div className='p-5'>
                {children}
            </div>
            <Footer />
        </div>
    )
}