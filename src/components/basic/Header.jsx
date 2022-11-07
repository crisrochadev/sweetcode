import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Header(){
    const router = useRouter()
    const menu = [
        {id:1,icon:'home',label:'Inicio',url:'/'},
        {id:2,icon:'folders',label:'Categorias',url:'/categorias'},
        {id:3,icon:'address-card',label:'Sobre',url:'/paginas/sobre'},
        {id:4,icon:'mailbox',label:'Contato',url:'/paginas/contato'},
    ]

    return(
        <header className="w-full mb-4">
            <ul className="flex justify-center items-center  border-b dark:border-gray-600">
                {menu.map((item,index) => (
                    <li
                        key={item.id}
                        className={` h-full py-2 transition-colors dark:border-gray-600 duration-300 hover:text-pink-800 px-4 bg-gray-50 dark:bg-gray-700 -mb-[1px] ${router.pathname === item.url ? 'border-t border-r border-l text-pink-800' : 'border-b'}`}
                        
                    >
                        <Link 
                            href={item.url}
                            className="h-full"
                        >
                            <p
                                className="h-full flex items-center"
                            >
                                <i className={`far fa-${item.icon} mr-2`}></i>
                                <span className="md:flex hidden">{item.label}</span>
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </header>
    )
}