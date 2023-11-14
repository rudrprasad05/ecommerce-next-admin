'use client'

import React from 'react'
import { HiBuildingStorefront, 
    HiOutlineHomeModern, 
    HiOutlineIdentification, 
    HiOutlineCurrencyDollar,
    HiOutlineCircleStack,
    HiListBullet,
    HiOutlineCog8Tooth,
    HiOutlineArrowRightOnRectangle } from 'react-icons/hi2'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface props{
    children: React.ReactNode
}

const Nav : React.FC<props> = ({ children }) => {


    const inactiveLink = "flex gap-5 items-center rounded-lg shadow-md"
    const activeLink = inactiveLink + "bg-white text-blue-500"
    const pathname = usePathname()

    return (
        <div className='flex'>
            <nav className='px-8 py-5 flex flex-col gap-5 capitalize sticky top-0 h-screen'>
                <Link href={"/"}>
                    <div className={inactiveLink}>
                        <HiBuildingStorefront size={30}/>
                        <span>Ecommerce</span>
                    </div>
                </Link>

                <Link href={"/"}>
                    <div className={pathname === '/' ? activeLink : inactiveLink}>
                        <HiOutlineIdentification size={30}/>
                        <span>Dashboard</span>
                    </div>
                </Link>

                <Link href={"/orders"}>
                    <div className={pathname.includes('/orders') ? activeLink : inactiveLink}>
                        <HiOutlineCurrencyDollar size={30}/>
                        <span>Orders</span>
                    </div>
                </Link>

                <Link href={"/products"}>
                    <div className={pathname.includes('/products') ? activeLink : inactiveLink }>
                        <HiOutlineCircleStack size={30}/>
                        <span>Products</span>
                    </div>
                </Link>

                <Link href={"/categories"}>
                    <div className={pathname.includes('/categories') ? activeLink : inactiveLink }>
                        <HiListBullet size={30}/>
                        <span>categories</span>
                    </div>
                </Link>

                
                <div className='mt-auto flex items-center justify-between'>

                    <button className="rounded-full overflow-clip w-8 relative my-auto">
                        <img alt="" className="w-full object-cover"/>
                    </button>


                    <button className="">
                        <HiOutlineArrowRightOnRectangle size={30}/>
                    </button>



            
                </div>
            </nav>

            <main className='grow bg-white text-black'>
                {children}
            </main>
        
        </div>
       
    )
}

export default Nav